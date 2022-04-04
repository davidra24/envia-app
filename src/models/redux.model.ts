import { setLoginAction, setGuide } from '../redux';
import { GuideModel } from './guides.model';

export interface StateModel {
  isLogged: boolean;
  guide: GuideModel | null;
}

export interface ActionModel<T, P> {
  readonly type: T;
  readonly payload?: P;
}

type ACTION_TYPE = typeof setLoginAction | typeof setGuide;

export type ActionTypes = ReturnType<ACTION_TYPE>;
