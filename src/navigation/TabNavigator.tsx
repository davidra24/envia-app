import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from '../hooks';
import {
  RootTabParamListModel,
  RootTabScreenPropsModel,
  StateModel
} from '../models';
import { useSelector } from 'react-redux';
import { GuideListTab, ProfileTab, DeliveryTab, VehicleTab } from '../screens';
import { COLORS } from '../utilities';

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) => {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
};

export const TabNavigator = () => {
  const colorScheme = useColorScheme();
  const Tab = createBottomTabNavigator<RootTabParamListModel>();
  const { Navigator, Screen } = Tab;
  const user = useSelector((state: StateModel) => state.reducer.user);

  const isOperator = user?.role === 'operator';
  const isDelivery = user?.role === 'delivery';
  const isVehicle = user?.role === 'vehicles';

  return (
    <Navigator
      initialRouteName='GuideListTab'
      screenOptions={{
        tabBarActiveTintColor: COLORS[colorScheme].tint
      }}
    >
      {isOperator && (
        <Screen
          name='GuideListTab'
          component={GuideListTab}
          options={({
            navigation
          }: RootTabScreenPropsModel<'GuideListTab'>) => ({
            title: 'Inicio',
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('QRLector')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1
                })}
              >
                <FontAwesome
                  name='qrcode'
                  size={25}
                  color={COLORS[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            )
          })}
        />
      )}
      {isVehicle && (
        <Screen
          name='VehicleTab'
          component={VehicleTab}
          options={({}: RootTabScreenPropsModel<'VehicleTab'>) => ({
            title: 'Vehículos',
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />
          })}
        />
      )}
      {isDelivery && (
        <Screen
          name='DeliveryTab'
          component={DeliveryTab}
          options={({}: RootTabScreenPropsModel<'DeliveryTab'>) => ({
            title: 'Reparto',
            tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />
          })}
        />
      )}
      <Screen
        name='ProfileTab'
        component={ProfileTab}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />
        }}
      />
    </Navigator>
  );
};
