import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

export const DeliveryTab = () => {
  return (
    <View style={styles.container}>
      <Text>Hola mundo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
