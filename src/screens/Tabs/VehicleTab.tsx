import { useState } from 'react';
import { BottomNavigation as DefaultBottomNavigation } from 'react-native-paper';
import { BottomNavigation } from '../../components';
import { RootTabScreenPropsModel } from '../../models';
import { VehicleComponent } from '../vehicles/VehiclesComponent';

const STATUS_DEPARTURE = 2;
const STATUS_DELIVERY = 3;

export const VehicleTab = ({
  navigation
}: RootTabScreenPropsModel<'VehicleTab'>) => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: 'vehicleDeparture',
      title: 'Salida de vehículo',
      icon: 'car-arrow-left'
    },
    {
      key: 'vehicleArrival',
      title: 'Llegada de vehículo',
      icon: 'car-arrow-right'
    }
  ]);

  const VehicleDep = () => (
    <VehicleComponent navigation={navigation} callStatus={STATUS_DEPARTURE} />
  );
  const VehicleArr = () => (
    <VehicleComponent navigation={navigation} callStatus={STATUS_DELIVERY} />
  );

  /** @ts-ignore */
  const renderScene = DefaultBottomNavigation.SceneMap({
    vehicleDeparture: VehicleDep,
    vehicleArrival: VehicleArr
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
