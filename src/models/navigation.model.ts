/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamListModel {}
  }
}
export type RootTabParamListModel = {
  GuideListTab: undefined;
  DeliveryTab: undefined;
  VehicleTab: undefined;
  ProfileTab: undefined;
  QRLector: undefined;
  GuideModal: { id: string };
  PDFReader: { base64: string };
};

export type RootStackParamListModel = {
  Login: undefined;
  Root: NavigatorScreenParams<RootTabParamListModel> | undefined;
  QRLector: undefined;
  GuideModal: { id: string };
  NotFound: undefined;
  PDFReader: { base64: string };
};

export type RootStackScreenPropsModel<
  Screen extends keyof RootStackParamListModel
> = NativeStackScreenProps<RootStackParamListModel, Screen>;

export type RootTabScreenPropsModel<
  Screen extends keyof RootTabParamListModel
> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamListModel, Screen>,
  NativeStackScreenProps<RootStackParamListModel>
>;
