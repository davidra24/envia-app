import {
  ActionModel,
  StateModel,
  ActionTypes,
  StateReducerModel
} from '../models';
import { SET_USER, SET_GUIDE, SET_GUIDES } from './constants';

export const initialState: StateReducerModel = {
  user: undefined,
  guide: undefined,
  guides: []
};

export const reducer = (
  state: StateModel = { reducer: initialState },
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
    case SET_GUIDES: {
      return {
        ...state,
        guides: action.payload
      };
    }
    default:
      return { ...state };
  }
};
