import { GuideModel, userInformationModel } from '../models';
import { SET_GUIDE, SET_USER } from './constants';

export const setUser = (payload: userInformationModel) => ({
  type: SET_USER,
  payload
});

export const setGuide = (payload: GuideModel) => ({ type: SET_GUIDE, payload });
