import { Dimensions, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

export const styleGuideComponent = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  informationView: {
    width: Dimensions.get('window').width - 10,
    marginLeft: 20,
    marginBottom: 20
  },
  idGuide: { marginTop: 15, marginBottom: 15, color: Colors.red800 },
  centerTitle: {
    textAlign: 'left'
  }
});
