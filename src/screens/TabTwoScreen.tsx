import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { Text } from '../components/Themed';
import { useLogout } from '../hooks';
import { styleProfile as style } from '../styles/profile.style';
import { initializeAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../config';

const auth = initializeAuth(firebaseApp);

const { container } = style;

type ProfileParams = {
  Login: undefined;
  Root: undefined;
};

type TProfileProps = NativeStackScreenProps<ProfileParams, 'Root'>;

export const TabTwoScreen = ({ navigation }: TProfileProps) => {
  const handleLogout = async () => {
    signOut(auth);
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={container}>
      <Text>Inicio</Text>
      <Text>Bienvenido</Text>
      <Button onPress={handleLogout}>Cerrar Sesión</Button>
    </SafeAreaView>
  );
};
