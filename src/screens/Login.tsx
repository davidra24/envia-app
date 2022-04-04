import React, { useEffect, useState } from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  TextInput,
  Button,
  ActivityIndicator,
  Colors
} from 'react-native-paper';
import { styleLogin as style } from '../styles';
import { RootStackParamListModel, userInformationModel } from '../models';
import { Layout } from '../components/Layout.component';
import { Text } from '../components/Themed';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { initializeAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseApp } from '../config';
import { REGEX_EMAIL } from '../utilities';
import { DialogComponent } from '../components/DialogComponent';

const auth = initializeAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

type TLoginProps = NativeStackScreenProps<RootStackParamListModel, 'Login'>;

export const LoginScreen = ({ navigation }: TLoginProps) => {
  const [userValue, setUserValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [validatedMail, setValidatedMail] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [typeDialog, setTypeDialog] = useState<string>('');

  const {
    container,
    logoImage,
    inputContainer,
    loginText,
    topContainer,
    buttomContainer
  } = style;

  const logo = require('../assets/images/envia-logo.png');

  const dialogManager = (message: string, type?: string) => {
    setVisible(true);
    setMessage(message);
    setTypeDialog(type || '');
    setPasswordValue('');
  };

  const getUserService = async (uid: string): Promise<userInformationModel> => {
    const docRef = doc(firestore, `users/${uid}`);
    const document = await getDoc(docRef);
    const result = document.data() as userInformationModel;
    return result;
  };

  const setEmail = (email: string) => {
    setUserValue(email);
    setValidatedMail(REGEX_EMAIL.test(email));
  };

  const resetPassword = () => {
    setPasswordValue('');
    sendPasswordResetEmail(auth, userValue);
    dialogManager('Se ha enviado un correo para su cambio de contraseña');
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userValue,
        passwordValue
      );
      const { uid } = userCredential.user;
      const user = await getUserService(uid);
      if (user) {
        const { role } = user;
        console.warn({ role });
        setIsLoading(false);
        return navigation.replace('Root');
      } else {
        setIsLoading(false);
        return dialogManager('Usuario no encontrado', 'error');
      }
    } catch (error) {
      setIsLoading(false);
      return dialogManager('Usuario o contraseña invalidas', 'error');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setIsLoading(false);
        navigation.replace('Root');
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <SafeAreaView style={container}>
      <Layout>
        {isLoading ? (
          <ActivityIndicator
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            animating={true}
            color={Colors.red800}
            size='large'
          />
        ) : (
          <>
            <View style={topContainer}>
              <Image style={logoImage} source={logo} />
              <View style={inputContainer}>
                <Text style={loginText}>Usuario</Text>
                <TextInput value={userValue} onChangeText={setEmail} />
              </View>
              <View style={inputContainer}>
                <Text style={loginText}>Contraseña</Text>
                <TextInput
                  value={passwordValue}
                  onChangeText={setPasswordValue}
                  secureTextEntry
                />
              </View>
            </View>
            <View style={buttomContainer}>
              <Button onPress={handleLogin}>Iniciar Sesión</Button>
              <Button disabled={!validatedMail} onPress={resetPassword}>
                Reestablecer contraseña
              </Button>
            </View>
            <DialogComponent
              visible={visible}
              message={message}
              setVisible={setVisible}
              type={typeDialog}
            />
          </>
        )}
      </Layout>
    </SafeAreaView>
  );
};
