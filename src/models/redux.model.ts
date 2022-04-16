import { setUser, setGuide, setGuides } from '../redux';
import { GuideModel } from './guides.model';
import { userInformationModel } from './user.model';

export interface StateModel {
  reducer: StateReducerModel;
}

export interface StateReducerModel {
  user: userInformationModel | undefined;
  guide: GuideModel | undefined;
  guides: Array<GuideModel> | undefined;
}

export interface ActionModel<T, P> {
  readonly type: T;
  readonly payload?: P;
}

type ACTION_TYPE = typeof setUser | typeof setGuide | typeof setGuides;

export type ActionTypes = ReturnType<ACTION_TYPE>;
