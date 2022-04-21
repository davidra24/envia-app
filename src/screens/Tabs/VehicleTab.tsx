import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  Colors,
  TextInput,
  Title
} from 'react-native-paper';
import { DialogComponent, ModalComponent, VehicleItem } from '../../components';
import { View } from '../../components/Themed';
import { RootTabScreenPropsModel } from '../../models';
import {
  PackageDeliveryModel,
  VehiclesModel
} from '../../models/vehicles.model';
import { stylesVehicle } from '../../styles/vehicletab.style';
import { getResource, postResource } from '../../utilities';

export const VehicleTab = ({
  navigation
}: RootTabScreenPropsModel<'VehicleTab'>) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>('');
  const [typeDialog, setTypeDialog] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<VehiclesModel>();
  const [vehicleNotes, setVehicleNotes] = useState<string>('');

  const [vehicles, setVehicles] = useState<Array<VehiclesModel>>([]);

  const { container } = stylesVehicle;

  const callVehicleList = async (vehicleStatus: number) => {
    setLoading(true);
    try {
      const vehicleList = await getResource<null, VehiclesModel>({
        baseUrl: 'http://mcrvehiculos.us-3.evennode.com/api',
        endpoint: `vehicles/vehiclesByStatus/${vehicleStatus}`
      });
      setVehicles(vehicleList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const releaseVehicle = async (vehicle?: VehiclesModel, notes?: string) => {
    setVisible(false);
    setLoading(true);
    try {
      if (vehicle) {
        const { id: idVehicle } = vehicle;
        const packageDelivery: PackageDeliveryModel = {
          idVehicle,
          notes: notes || '',
          dateTime: new Date()
        };
        const posted = await postResource<PackageDeliveryModel, string>({
          baseUrl: 'http://mcrvehiculos.us-3.evennode.com/api',
          endpoint: 'event/packageDelivery',
          body: packageDelivery
        });
        setLoading(false);
        callVehicleList(2);
        setVehicleNotes('');
        dialogManager(posted, 'success');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const dialogManager = (message?: string, type?: string) => {
    setVisibleDialog(true);
    setMessage(message);
    setTypeDialog(type || '');
  };

  useEffect(() => {
    callVehicleList(2);
    const willFocusSubscription = navigation.addListener('focus', () => {
      callVehicleList(2);
    });
    return willFocusSubscription;
  }, []);

  return (
    <View style={container}>
      {loading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          animating={true}
          color={Colors.red800}
          size='large'
        />
      ) : (
        <ScrollView>
          {vehicles && vehicles.length ? (
            vehicles.map((vehicle, index) => (
              <VehicleItem
                key={index}
                vehicle={vehicle}
                setVisible={setVisible}
                setSelectedVehicle={setSelectedVehicle}
              />
            ))
          ) : (
            <Caption>No hay vehículos listos para salida</Caption>
          )}
        </ScrollView>
      )}
      <ModalComponent visible={visible} setVisible={setVisible}>
        <View>
          {selectedVehicle && (
            <View>
              <Card.Title
                title={selectedVehicle.Nombre}
                subtitle={selectedVehicle.Placa}
              />
            </View>
          )}
          <Title>Notas de vehículo:</Title>
          <TextInput
            value={vehicleNotes}
            onChangeText={setVehicleNotes}
            placeholder='Notas de vehículo...'
          />
          <Button
            onPress={() => {
              releaseVehicle(selectedVehicle, vehicleNotes);
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
    </View>
  );
};
