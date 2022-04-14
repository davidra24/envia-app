import { ActionModel, StateModel, ActionTypes } from '../models';
import { SET_USER, SET_GUIDE } from './constants';

export const initialState: StateModel = {
  user: undefined,
  guide: null
};

export const reducer = (
  state: StateModel = initialState,
  action: ActionModel<string, ActionTypes>
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_GUIDE: {
      return {
        ...state,
        guide: action.payload
      };
    }
    default:
      return { ...state };
  }
};
