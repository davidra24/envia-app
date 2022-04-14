import { setUser, setGuide } from '../redux';
import { GuideModel } from './guides.model';
import { userInformationModel } from './user.model';

export interface StateModel {
  reducer: {
    user: userInformationModel | undefined;
    guide: GuideModel | null;
  };
}

export interface ActionModel<T, P> {
  readonly type: T;
  readonly payload?: P;
}

type ACTION_TYPE = typeof setUser | typeof setGuide;

export type ActionTypes = ReturnType<ACTION_TYPE>;
