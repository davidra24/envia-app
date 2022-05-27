import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Caption,
  Card,
  Colors,
  TextInput,
  Title
} from 'react-native-paper';
import {
  DialogComponent,
  ModalComponent,
  VehicleItem,
  View
} from '../../components';
import { RefreshView } from '../../containers/RefreshView';
import {
  PackageDeliveryModel,
  VehiclesModel,
  VehicleStatusModel
} from '../../models/vehicles.model';
import { stylesVehicle } from '../../styles/vehicletab.style';
import { getResource, postResource } from '../../utilities';

const STATUS_INITIAL = '1';
const STATUS_DEPARTURE = '2';
const STATUS_DELIVERY = '3';

export const VehicleComponent = ({ navigation, callStatus }: any) => {
  const [vehicles, setVehicles] = useState<Array<VehiclesModel>>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>('');
  const [typeDialog, setTypeDialog] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<VehiclesModel>();
  const [vehicleNotes, setVehicleNotes] = useState<string>('');

  const { container } = stylesVehicle;

  const dialogManager = (message?: string, type?: string) => {
    setVisibleDialog(true);
    setMessage(message);
    setTypeDialog(type || '');
  };
  const callVehicleList = async () => {
    setLoading(true);
    try {
      const vehicleList = await getResource<null, Array<VehiclesModel>>({
        endpoint: `vehicles/vehiclesByStatus/${callStatus}`
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
          endpoint: 'event/packageDelivery',
          body: packageDelivery
        });
        setLoading(false);
        callVehicleList();
        setVehicleNotes('');
        dialogManager(posted, 'success');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const changeToCreated = async (vehicle?: VehiclesModel, notes?: string) => {
    setVisible(false);
    setLoading(true);
    try {
      if (vehicle) {
        const { id: idVehicle } = vehicle;
        const changeStatusVehicle: VehicleStatusModel = {
          dateTime: new Date(),
          eventTipe: STATUS_INITIAL,
          notes: notes,
          idVehicle: idVehicle.toString()
        };
        const posted = await postResource<VehicleStatusModel, string>({
          endpoint: 'event',
          body: changeStatusVehicle
        });
        setLoading(false);
        callVehicleList();
        setVehicleNotes('');
        dialogManager(posted, 'success');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    callVehicleList();
    const willFocusSubscription = navigation.addListener('focus', () => {
      callVehicleList();
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
        <RefreshView functionToCall={() => callVehicleList()}>
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
            <Caption>
              {callStatus === 2
                ? 'No hay vehículos listos para salida'
                : 'No hay vehículos en reparto '}
            </Caption>
          )}
        </RefreshView>
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
              if (callStatus === 2) {
                releaseVehicle(selectedVehicle, vehicleNotes);
              } else {
                changeToCreated(selectedVehicle, vehicleNotes);
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
    </View>
  );
};
