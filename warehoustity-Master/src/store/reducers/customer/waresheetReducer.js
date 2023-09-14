import {
  IS_ERROR,
  IS_LOADING,
  ERROR_MESSAGE,
  NEW_WARESHEET,
  WARESHEET_LIST,
  WARESHEET_BY_ID
} from '../../types';


const initialState = {
  isLoading: false,
  isError: "",
  isErrorMsg: "",
  waresheetList: [],
  waresheetDetail: [],
  waresheetById: null,
}


export function WARESHEETINFO(state = initialState, action) {

  switch (action.type) {


    case NEW_WARESHEET:
      return {
        ...state,
        waresheetDetail: action.payload,
      };

    case WARESHEET_BY_ID:
      return {
        ...state,
        waresheetById: action.payload,
      };

    case WARESHEET_LIST:
      return {
        ...state,
        waresheetList: action.payload,
      };

    case IS_LOADING:

      return {
        ...state,
        isLoading: action.isLoading,
      };

    case IS_ERROR:
      return {
        ...state,
        isError: action.isError,
      };

    case ERROR_MESSAGE:
      return {
        ...state,
        isErrorMsg: action.payload,
      };


    default:
      return state;
  }
}
