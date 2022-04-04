import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

export const TabOneScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HOLA MUNDO</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
