import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { View } from './Themed';

interface ModalComponentPros {
  visible: boolean;
  setVisible: Function;
  children: React.ReactNode;
}

export const ModalComponent = ({
  visible,
  setVisible,
  children
}: ModalComponentPros) => {
  const stylesModal = StyleSheet.create({
    containerStyle: {
      alignItems: 'center'
    },
    modalContainer: {
      width: '92%',
      paddingHorizontal: 20,
      paddingVertical: 25
    }
  });

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={stylesModal.containerStyle}
        >
          <View style={stylesModal.modalContainer}>{children}</View>
        </Modal>
      </Portal>
    </Provider>
  );
};
