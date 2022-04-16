import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

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
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={containerStyle}
        >
          {children}
        </Modal>
      </Portal>
    </Provider>
  );
};
