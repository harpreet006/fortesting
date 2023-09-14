import {
  IS_ERROR,
  IS_LOADING,
  ERROR_MESSAGE
} from '../types';


export function isError(state = false, action) {
  switch (action.type) {
    case IS_ERROR:
      return action.isError;
    default:
      return state;
  }
}

export function isLoading(state = false, action) {
  switch (action.type) {
    case IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}


export function errorMessage(state = null, action) {
  switch (action.type) {
    case ERROR_MESSAGE:
      return action.errorMessage;
    default:
      return state;
  }
}

