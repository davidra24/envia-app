import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Headline, Title } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { View } from '../components/Themed';
import { styleProfile as style } from '../styles/profile.style';
import { initializeAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../config';
import { StateModel } from '../models';

const auth = initializeAuth(firebaseApp);

const { container, upContainer } = style;

type ProfileParams = {
  Login: undefined;
  Root: undefined;
};

type TProfileProps = NativeStackScreenProps<ProfileParams, 'Root'>;

export const TabTwoScreen = ({ navigation }: TProfileProps) => {
  const user = useSelector((state: StateModel) => state.reducer.user);
  const handleLogout = async () => {
    signOut(auth);
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={container}>
      <View style={upContainer}>
        <Title>Bienvenido </Title>
        <Headline>{user?.user}</Headline>
        <Divider />
      </View>
      <Button onPress={handleLogout}>Cerrar Sesión</Button>
    </SafeAreaView>
  );
};
