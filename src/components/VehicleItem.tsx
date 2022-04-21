import { Dimensions, StyleSheet } from 'react-native';
import {
  Avatar,
  Button,
  Caption,
  Card,
  Paragraph,
  Title
} from 'react-native-paper';
import { PackageDeliveryModel, VehiclesModel } from '../models/vehicles.model';
import { postResource } from '../utilities';
import { View } from './Themed';

const LeftContent = (props: any) => (
  <Avatar.Icon {...props} style={{ marginEnd: 10 }} icon='car' />
);

export const VehicleItem = ({
  vehicle,
  setVisible,
  setSelectedVehicle
}: {
  vehicle: VehiclesModel;
  setVisible: Function;
  setSelectedVehicle: Function;
}) => {
  return (
    <View style={styles.container}>
      <Card>
        <Caption style={styles.idVehicle}>{vehicle.id}</Caption>
        <Card.Title
          title={vehicle.Nombre}
          subtitle={vehicle.Placa}
          left={LeftContent}
        />
        <Card.Content>
          <Title>Ruta definida: {vehicle.RutaDefinida}</Title>
          <Paragraph>Estado: {vehicle.EstadoVehiculo}</Paragraph>
        </Card.Content>
        <Card.Actions style={{ justifyContent: 'flex-end' }}>
          <Button
            onPress={() => {
              setSelectedVehicle(vehicle);
              setVisible(true);
              // releaseVehicle();
            }}
          >
            Dar salida
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 40,
    marginHorizontal: 10,
    marginTop: 10,
    borderColor: 'white'
  },
  idVehicle: {
    marginLeft: 20
  }
});
