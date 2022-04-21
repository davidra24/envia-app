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
          GuideListTab: {
            screens: {
              GuideListTab: 'one'
            }
          },
          DeliveryTab: {
            screens: {
              DeliveryTab: 'two'
            }
          },
          ProfileTab: {
            screens: {
              ProfileTab: 'three'
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
