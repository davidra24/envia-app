import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamListModel } from '../models';

export const linking: LinkingOptions<RootStackParamListModel> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Login: 'Login',
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one'
            }
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two'
            }
          }
        }
      },
      QRLector: 'QRLector',
      GuideModal: 'GuideModal',
      PDFReader: 'PDFReader',
      NotFound: '*'
    }
  }
};
