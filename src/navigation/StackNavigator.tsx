import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, ModalScreen } from '../screens';
import {
  RootStackParamListModel,
  StateModel,
  userInformationModel
} from '../models';
import { TabNavigator } from './TabNavigator';
import { NotFoundScreen } from '../screens';
import { QRLectorModal } from '../screens/QRLectorModal';
import { GuideModal } from '../screens/Guide/GuideScreen';
import { initializeAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '../config';
import { getFirestore } from 'firebase/firestore';
import { getUserService } from '../utilities/userService';
import { setUser } from '../redux';
import { PDFRender } from '../screens/PDFRender';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';

const { Navigator, Screen, Group } =
  createNativeStackNavigator<RootStackParamListModel>();

const auth = initializeAuth(firebaseApp);

export const StackNavigator = () => {
  const user = useSelector<StateModel, userInformationModel | undefined>(
    (state) => state.reducer.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, async (userFirebase) => {
      if (!user) {
        if (userFirebase) {
          const { uid } = userFirebase;
          const user = await getUserService(uid);
          const token = await userFirebase.getIdToken();
          dispatch(setUser({ ...user, token }));
        }
      }
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <Navigator
      initialRouteName={!user ? 'Login' : 'Root'}
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
      <Screen
        name='GuideModal'
        component={GuideModal}
        options={{
          headerShown: true,
          title: 'Información de guia',
          headerBackButtonMenuEnabled: true
        }}
      />
      <Group screenOptions={{ presentation: 'modal' }}>
        <Screen name='QRLector' component={QRLectorModal} />
        <Screen name='PDFReader' component={PDFRender} />
      </Group>
    </Navigator>
  );
};
