import { Dimensions, StyleSheet } from 'react-native';

export const styleLogin = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width - 50
  },
  topContainer: {
    flex: 1
  },
  buttomContainer: {
    flex: 0.8,
    paddingTop: 20
  },
  logoImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 200,
    marginTop: 20
  },
  inputContainer: {
    marginTop: 30
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  loginInput: {
    fontSize: 15,
    backgroundColor: '#dfdfdf',
    marginHorizontal: 20,
    borderRadius: 25
  }
});
