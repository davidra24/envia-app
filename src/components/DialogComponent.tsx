import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

export const DIALOG = {
  INFORMATION: '#2177D1',
  ERROR: '#DB3C21',
  WARNING: '#FC9404',
  SUCCESS: '#1AAA55'
};

interface DialogProps {
  visible: boolean;
  setVisible: Function;
  message: string;
  type?: string;
  dismiss?: Function;
}

export const DialogComponent = ({
  visible,
  setVisible,
  dismiss,
  type,
  message
}: DialogProps) => {
  const backgroundColor =
    type === 'success'
      ? DIALOG.SUCCESS
      : type === 'warning'
      ? DIALOG.WARNING
      : type === 'error'
      ? DIALOG.ERROR
      : DIALOG.INFORMATION;

  return (
    <Snackbar
      style={{ backgroundColor }}
      visible={visible}
      onDismiss={() => setVisible(false)}
      action={{
        label: 'Ok',
        color: 'white',
        onPress: () => (dismiss ? dismiss() : setVisible(false))
      }}
    >
      <Text style={{ color: 'white' }}>{message}</Text>
    </Snackbar>
  );
};
