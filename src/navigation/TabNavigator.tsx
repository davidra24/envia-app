import { Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from '../hooks';
import { RootTabParamListModel, RootTabScreenPropsModel } from '../models';
import { TabOneScreen, TabTwoScreen } from '../screens';
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

  return (
    <Navigator
      initialRouteName='TabOne'
      screenOptions={{
        tabBarActiveTintColor: COLORS[colorScheme].tint
      }}
    >
      <Screen
        name='TabOne'
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenPropsModel<'TabOne'>) => ({
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
      <Screen
        name='TabTwo'
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />
        }}
      />
    </Navigator>
  );
};
