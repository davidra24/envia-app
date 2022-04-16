import { GuideModel, userInformationModel } from '../models';
import { SET_GUIDE, SET_GUIDES, SET_USER } from './constants';

export const setUser = (payload: userInformationModel) => ({
  type: SET_USER,
  payload
});

export const setGuide = (payload: GuideModel | undefined) => ({
  type: SET_GUIDE,
  payload
});

export const setGuides = (payload: Array<GuideModel> | undefined) => ({
  type: SET_GUIDES,
  payload
});
