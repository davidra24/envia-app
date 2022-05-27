import { Dimensions, StyleSheet } from 'react-native';

export const styleProfile = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  upContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0)'
  },
  button: {
    margin: 15,
    paddingLeft: 0
  },
  inputText: {
    paddingLeft: 0
  }
});
