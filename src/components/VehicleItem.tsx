import { useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Avatar,
  Button,
  Caption,
  Card,
  Paragraph,
  Title
} from 'react-native-paper';
import { VehiclesModel } from '../models/vehicles.model';
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
  const vehicleInfo = useMemo(() => {
    let status = '';
    let message = '';
    switch (vehicle.EstadoVehiculo) {
      case 2:
        status = 'LISTO PARA SALIR';
        message = 'Dar salida';
        break;
      case 3:
        status = 'EN REPARTO';
        message = 'Terminar reparto';
        break;
    }
    return { status, message };
  }, [vehicle]);

  return (
    <View style={styles.container}>
      <Card>
        <Caption style={styles.idVehicle}>{`Vehículo: ${vehicle.id}`}</Caption>
        <Card.Title
          title={vehicle.Nombre}
          subtitle={`Placa: ${vehicle.Placa}`}
          left={LeftContent}
        />
        <Card.Content>
          <Title>Ruta #: {vehicle.RutaDefinida}</Title>
          <Paragraph>Estado: {vehicleInfo.status}</Paragraph>
        </Card.Content>
        <Card.Actions style={{ justifyContent: 'flex-end' }}>
          <Button
            onPress={() => {
              setSelectedVehicle(vehicle);
              setVisible(true);
            }}
          >
            {vehicleInfo.message}
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
