import {
  IS_ERROR,
  IS_LOADING,
  ERROR_MESSAGE,
  IS_PENDING
} from '../types';


export function isError(error) {
  return {
    type: IS_ERROR,
    isError: error,
  };
}


export function isLoading(bool) {
  return {
    type: IS_LOADING,
    isLoading: bool,
  };
}

export function isPending(bool) {
  return {
    type: IS_PENDING,
    isLoading: bool,
  };
}


export function errorMessage(error) {
  return {
    type: ERROR_MESSAGE,
    errorMessage: error,
  };
}


export function showError(error) {
  return async(dispatch) => {
    dispatch(isLoading(false));
    dispatch(isError(true));
    dispatch(errorMessage(error));
  }
}


export function clearError() {
  return async(dispatch) => {
    dispatch(isLoading(false));
    dispatch(isError(false));
    dispatch(errorMessage(''));
  }
}