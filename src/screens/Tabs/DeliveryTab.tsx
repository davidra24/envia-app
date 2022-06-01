import { getResource, putResource } from '../../utilities';
import { View, Text } from '../../components/Themed';
import React, { useEffect, useState } from 'react';
import { Button, Card, TextInput, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { GuideViewModel, STATUS_ENUM } from '../../models';
import { styleProfile as style } from '../../styles/profile.style';
import { ActivityIndicator, Colors, List } from 'react-native-paper';
import { AssignedGuideModel } from '../../models/assignedGuide.model';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DialogComponent, ModalComponent } from '../../components';
import { VehiclesModel } from '../../models/vehicles.model';
import { RefreshView } from '../../containers/RefreshView';

const { button } = style;
type ProfileParams = { Login: undefined; Root: undefined };
type TProfileProps = NativeStackScreenProps<ProfileParams, 'Root'>;

const STATUS_IN_DISTRIBUTION = 2;
const STATUS_VEHICLE_DELIVERY = 3;

export const DeliveryTab = ({ navigation }: TProfileProps) => {
  const [listGuidesByRoute, setListGuidesByRoute] = useState<
    Array<GuideViewModel>
  >([]);
  const [listGuides, setListGuides] = useState<Array<GuideViewModel>>([]);
  const [listRoutes, setListRoutes] = useState<Array<VehiclesModel>>([]);
  const [loading, setLoading] = useState(false);
  const [caseGuide, setCaseGuide] = useState<string>('');
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>('');
  const [typeDialog, setTypeDialog] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<GuideViewModel>();

  useEffect(() => {
    callListRoutes();
    callListGuides();
    const willFocusSubscription = navigation.addListener('focus', () => {
      callListRoutes();
      callListGuides();
    });
    return willFocusSubscription;
  }, []);

  const callListRoutes = async () => {
    setLoading(true);
    try {
      const listRoutes = await getResource<null, Array<VehiclesModel>>({
        endpoint: `vehicles/vehiclesByStatus/${STATUS_VEHICLE_DELIVERY}`
      });
      console.log(listRoutes);

      setListRoutes(listRoutes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setListRoutes([]);
    }
  };

  const callListGuides = async () => {
    setLoading(true);
    const list = await getResource<null, Array<GuideViewModel>>({
      endpoint: `guides_view?status=${STATUS_IN_DISTRIBUTION}`
    });
    setListGuides(list);
    setLoading(false);
  };

  const callListGuidesByRoute = async (id: number | undefined) => {
    setLoading(true);
    const list = await getResource<null, Array<AssignedGuideModel>>({
      endpoint: `assignedGuides/${id}`
    });
    setLoading(false);
    return list;
  };

  const callDeliveredGuide = async (guide: GuideViewModel) => {
    setLoading(true);
    try {
      const putted = await putResource<GuideViewModel, any>({
        endpoint: `guides/${guide.id_guide}`,
        body: guide
      });
      if (putted) {
        dialogManager('Se ha confirmado la entrega del paquete', 'success');
      } else {
        dialogManager('No se pudo confirmar la entrega del paquete', 'error');
      }
    } catch (error) {
      dialogManager('No se pudo confirmar la entrega del paquete', 'error');
      console.log(error);
    }

    setLoading(false);
  };

  const handleSelectedRoute = (id: number | undefined) => {
    callListGuidesByRoute(id).then((response) => {
      let guides: Array<GuideViewModel> = [];
      response.forEach((assigned: AssignedGuideModel) => {
        let item = listGuides.find((item) => {
          return item.id_guide === assigned.Id;
        });
        if (item !== undefined) {
          guides.push(item);
        }
      });
      setListGuidesByRoute(guides);
    });
  };

  const confirmDeliveredGuide = async (
    guide: GuideViewModel,
    action: string
  ) => {
    if (action === 'report') {
      guide.notes_guide = caseGuide;
      guide.status_guide = STATUS_ENUM.CLASSIFICATION;
    } else {
      guide.status_guide = STATUS_ENUM.GUIDE_DELIVERED;
    }
    await callDeliveredGuide(guide);
  };

  const dialogManager = (message?: string, type?: string) => {
    setVisibleDialog(true);
    setMessage(message);
    setTypeDialog(type || '');
  };

  return (
    <SafeAreaView>
      <RefreshView
        functionToCall={async () => {
          await callListRoutes();
          await callListGuides();
        }}
      >
        <List.Section title='Selecciona la ruta para ver las guías'>
          <List.Accordion title='Rutas'>
            {listRoutes &&
              listRoutes.map(
                (item, index) =>
                  item.EstadoVehiculo && (
                    <View key={index}>
                      <List.Item
                        title={item.Nombre}
                        onPress={() => {
                          handleSelectedRoute(item.id);
                        }}
                      />
                    </View>
                  )
              )}
          </List.Accordion>
        </List.Section>

        {loading ? (
          <ActivityIndicator
            animating={true}
            color={Colors.red800}
            size='large'
          />
        ) : listGuidesByRoute ? (
          <List.Section title='Guías pendientes por entregar'>
            {listGuidesByRoute.map((item, index) => (
              <List.Accordion
                key={index}
                title={item.address_addressee_in_guide}
                left={(props) => <List.Icon {...props} icon='folder' />}
              >
                <Card style={{ paddingLeft: 0 }}>
                  <Card.Content>
                    <Card.Title
                      title={`${item.first_name_addressee} ${item.last_name_addressee}`}
                      subtitle={`Contenido: ${item.content_guide}`}
                    />
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        padding: 0
                      }}
                    >
                      <Button
                        onPress={() => {
                          setSelectedGuide(item);
                          setVisible(true);
                        }}
                        style={button}
                      >
                        Reportar
                      </Button>
                      <Button
                        onPress={() => {
                          confirmDeliveredGuide(item, '');
                        }}
                        style={button}
                      >
                        Confirmar entrega
                      </Button>
                    </View>
                  </Card.Content>
                </Card>
              </List.Accordion>
            ))}
          </List.Section>
        ) : (
          <Text>No hay guías pendientes por entregar</Text>
        )}
      </RefreshView>
      <ModalComponent visible={visible} setVisible={setVisible}>
        <View>
          <Title>Reportar caso:</Title>
          <TextInput
            value={caseGuide}
            onChangeText={setCaseGuide}
            placeholder='Reporta tu caso al momento de la entrega'
          />
          <Button
            onPress={() => {
              if (selectedGuide) {
                setVisible(false);
                confirmDeliveredGuide(selectedGuide, 'report');
              }
            }}
          >
            Aceptar
          </Button>
        </View>
      </ModalComponent>
      <DialogComponent
        visible={visibleDialog}
        message={message}
        setVisible={setVisibleDialog}
        type={typeDialog}
      />
    </SafeAreaView>
  );
};
