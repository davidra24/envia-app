import { ReactNode } from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';

const textura = require('../assets/images/textura-6.png');

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <ImageBackground source={textura} style={style.container}>
    {children}
  </ImageBackground>
);

const style = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
