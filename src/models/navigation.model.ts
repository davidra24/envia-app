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
import { userInformationModel } from './user.model';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamListModel {}
  }
}
export type RootTabParamListModel = {
  TabOne: undefined;
  TabTwo: undefined;
  QRLector: undefined;
  GuideModal: { id: string };
};

export type RootStackParamListModel = {
  Login: undefined;
  Root: NavigatorScreenParams<RootTabParamListModel> | undefined;
  QRLector: undefined;
  GuideModal: { id: string };
  NotFound: undefined;
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
