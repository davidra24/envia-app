import { useEffect, useState } from 'react';
import { GuideObject, GuideViewModel, RouteModel } from '../../models';
import { View } from '../Themed';
import { styleGuideComponent as style } from '../../styles';
import { getResource, putResource, statusGuide } from '../../utilities';
import {
  ActivityIndicator,
  Button,
  Colors,
  Divider,
  List,
  Paragraph,
  Subheading,
  TextInput,
  Title
} from 'react-native-paper';
import { InformationComponent } from './InformationComponent';
import { ModalComponent } from '../ModalComponent';
import { PaperSelect } from 'react-native-paper-select';
import { list } from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';
import { useColorScheme } from 'react-native';

export const GuideComponent = ({
  guide,
  navigation
}: {
  guide: GuideViewModel;
  navigation: {
    replace: Function;
  };
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [listRoutes, setListRoutes] = useState<Array<list>>([]);
  const [indexSelected, setIndexSelected] = useState(0);
  const [error, setError] = useState<boolean>(false);

  const {
    id_guide,
    status_guide,
    date_admission,
    notes_guide,
    content_guide,
    origin_regional,
    origin_city,
    destination_city,
    destination_regional,
    address_addressee_in_guide,
    document_sender,
    first_name_sender,
    last_name_sender,
    address_sender,
    phone_sender,
    postal_code_sender,
    document_addressee,
    first_name_addressee,
    last_name_addressee,
    address_addressee,
    phone_addressee,
    postal_code_addressee,
    assigned_route
  } = guide;

  /* const [suggestedRoute, setSuggestedRoute] = useState<string>(
    assigned_route || ''
  ); */
  const [selectedRoute, setSelectedRoute] = useState<string | undefined>(
    assigned_route
  );

  const [assignedRoute, setAssignedRoute] = useState<string>('');

  const theme = useColorScheme();

  const findRoute = async (address: string) => {
    setLoading(true);
    try {
      const newAddress = address.replace(/ /g, '%20').replace(/#/g, '%23');
      const addressRoute = await getResource<null, RouteModel>({
        endpoint: `route?address=${newAddress}`
      });
      if (guide && addressRoute?.Id) {
        const index = listRoutes.findIndex(
          (route) => route._id === addressRoute?.Id
        );
        const route = listRoutes.find(
          (route) => route._id === addressRoute?.Id
        );
        setIndexSelected(index);
        route && setAssignedRoute(route._id);
        setSelectedRoute(route?.value);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setSelectedRoute(undefined);
    }
  };

  const callListRoutes = async () => {
    setLoading(true);
    try {
      const listRoutes = await getResource<null, Array<RouteModel>>({
        endpoint: 'polygon'
      });
      const routes: list[] = listRoutes.map((route: RouteModel) => ({
        _id: route.Id,
        value: route.Name
      })) as list[];
      setListRoutes(routes);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setListRoutes([]);
    }
  };

  useEffect(() => {
    callListRoutes();
  }, []);

  useEffect(() => {
    guide && findRoute(guide?.address_addressee_in_guide);
  }, [guide]);

  const saveRoute = async () => {
    setVisible(false);
    setLoading(true);
    if (assignedRoute) {
      setError(false);
      try {
        const res = await putResource<GuideObject, any>({
          endpoint: `guides/pdf/${id_guide}`,
          body: {
            guide_person: {
              assigned_route: assignedRoute
            },
            guide: {
              status_guide: 2
            }
          }
        });
        if (res) {
          setLoading(false);
          await navigation.replace('Root');
        }
      } catch (error) {
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };

  return (
    <View style={style.container}>
      <Subheading style={style.idGuide}>{id_guide}</Subheading>
      <View style={style.informationView}>
        <Title style={style.centerTitle}>Información de guia</Title>
        <Divider />
        <InformationComponent
          title='Estado: '
          content={statusGuide(status_guide)}
        />
        <InformationComponent
          title='Admisión: '
          content={` ${date_admission}`}
        />
        <InformationComponent title='Notas: ' content={notes_guide} />
        <InformationComponent title='Contenido: ' content={content_guide} />
      </View>
      <View style={style.informationView}>
        <Title style={style.centerTitle}>Información de envío</Title>
        <Divider />
        <InformationComponent
          title='Regional de origen: '
          content={origin_regional}
        />
        <InformationComponent
          title='Ciudad de origen: '
          content={origin_city}
        />
        <InformationComponent
          title='Ciudad de destino: '
          content={destination_city}
        />
        <InformationComponent
          title='Regional de destino: '
          content={destination_regional}
        />
        <InformationComponent
          title='Dirección de envío: '
          content={address_addressee_in_guide}
        />
      </View>
      <List.AccordionGroup>
        <View style={style.informationView}>
          <List.Accordion title='Información de remitente' id='1'>
            <Divider />
            <InformationComponent
              title='Documento: '
              content={document_sender}
            />
            <InformationComponent
              title='Nombre: '
              content={`${first_name_sender} ${last_name_sender}`}
            />
            <InformationComponent
              title='Dirección: '
              content={address_sender}
            />
            <InformationComponent title='Teléfono: ' content={phone_sender} />
            <InformationComponent
              title='Codigo postal: '
              content={postal_code_sender}
            />
          </List.Accordion>
        </View>
        <View style={style.informationView}>
          <List.Accordion title='Información de destinatario' id='2'>
            <Divider />
            <InformationComponent
              title='documento: '
              content={document_addressee}
            />
            <InformationComponent
              title='Nombre: '
              content={`${first_name_addressee} ${last_name_addressee}`}
            />
            <InformationComponent
              title='Dirección: '
              content={address_addressee}
            />
            <InformationComponent
              title='Teléfono: '
              content={phone_addressee}
            />
            <InformationComponent
              title='Codigo postal: '
              content={postal_code_addressee}
            />
          </List.Accordion>
        </View>
      </List.AccordionGroup>
      {assigned_route ? (
        <Paragraph style={{ fontWeight: 'bold' }}>{assigned_route}</Paragraph>
      ) : (
        <Button onPress={() => setVisible(true)}>Definir ruta</Button>
      )}
      <ModalComponent visible={visible} setVisible={setVisible}>
        {loading ? (
          <ActivityIndicator
            animating={true}
            color={Colors.red800}
            size='large'
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          />
        ) : (
          <View>
            <PaperSelect
              label='Seleccione una ruta'
              value={selectedRoute || ''}
              onSelection={(value: any) => {
                setError(false);
                setSelectedRoute(value.text);
                setAssignedRoute(value.selectedList[0]._id);
              }}
              arrayList={[...listRoutes]}
              selectedArrayList={[listRoutes[indexSelected]]}
              errorText={error ? 'Seleccione una ruta' : ''}
              multiEnable={false}
              textInputBackgroundColor={theme === 'dark' ? 'black' : 'white'}
            />
            <Button onPress={saveRoute}>Ok</Button>
          </View>
        )}
      </ModalComponent>
    </View>
  );
};
