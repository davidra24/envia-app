import { ActionModel, StateModel, ActionTypes } from '../models';
import { SET_LOGGED, SET_GUIDE } from './constants';

export const initialState: StateModel = {
  isLogged: false,
  guide: null
};

export const reducer = (
  state: StateModel = initialState,
  action: ActionModel<string, ActionTypes>
) => {
  switch (action.type) {
    case SET_LOGGED:
      return {
        ...state,
        isLogged: action.payload
      };
    case SET_GUIDE: {
      return {
        ...state,
        guide: action.payload
      };
    }
    default:
      return state;
  }
};
