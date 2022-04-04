import { Platform, StyleSheet } from 'react-native'

const paddingTopContainer = Platform.OS === 'ios' ? 80 : 5

export const styleMain = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: paddingTopContainer,
  },
})
