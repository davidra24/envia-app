import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, ModalScreen } from '../screens';
import { RootStackParamListModel, StateModel } from '../models';
import { setLoginAction, SET_LOGGED } from '../redux';
import { TabNavigator } from './TabNavigator';
import { NotFoundScreen } from '../screens';
import { QRLectorModal } from '../screens/QRLectorModal';
import { GuideModal } from '../screens/GuideScreen';

const { Navigator, Screen, Group } =
  createNativeStackNavigator<RootStackParamListModel>();

export const StackNavigator = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<StateModel, boolean>(
    (state) => state.isLogged
  );

  /* const comprobateSigned = async () => {
    const user = isSigned();
    dispatch({ type: SET_LOGGED, action: setLoginAction(!!user) });
  };

  useEffect(() => {
    comprobateSigned();
  }, []); */

  return (
    <Navigator
      initialRouteName={!isLoggedIn ? 'Login' : 'Root'}
      screenOptions={{ headerShown: false }}
    >
      <Screen name='Login' component={LoginScreen} />
      <Screen
        name='Root'
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Group screenOptions={{ presentation: 'modal' }}>
        <Screen name='QRLector' component={QRLectorModal} />
        <Screen
          name='GuideModal'
          component={GuideModal}
          options={{ headerShown: true, title: 'Información de guia' }}
        />
      </Group>
    </Navigator>
  );
};
