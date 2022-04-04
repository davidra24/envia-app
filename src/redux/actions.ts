import { GuideModel } from '../models';
import { SET_GUIDE, SET_LOGGED } from './constants';

export const setLoginAction = (payload: boolean) => ({
  type: SET_LOGGED,
  payload
});

export const setGuide = (payload: GuideModel) => ({ type: SET_GUIDE, payload });
