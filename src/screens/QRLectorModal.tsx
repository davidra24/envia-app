import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { RootTabScreenPropsModel } from '../models';
import { REGEX_GUIDE_UID } from '../utilities';

export const QRLectorModal = ({
  navigation
}: RootTabScreenPropsModel<'QRLector'>) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      /** @ts-ignore */
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={(...args) => {
          const id = args[0].data;
          // const result = JSON.stringify(data);
          if (REGEX_GUIDE_UID.test(id)) {
            return navigation.replace('GuideModal', { id });
          }
          return navigation.goBack();
        }}
        barCodeScannerSettings={{
          barCodeTypes: ['qr']
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: 'white'
  }
});
