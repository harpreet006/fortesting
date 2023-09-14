import {
    COMPARE,
    IS_ERROR,
    IS_LOADING
  } from '../../types';
  
    const initialState = {
      isLoading:false,
      isError:"",
      compareList:[]
    }
  
    export function COMPARE_INFO(state =initialState , action) {
      
      switch (action.type) {

        case COMPARE:
        return {
            ...state,
            compareList:action.payload,
        };

        case IS_LOADING:
        return {
            ...state,
            isLoading:action.isLoading,
        };

        case IS_ERROR:
          return {
              ...state,
              isError:action.isError,
          };
        
        default:
          return state;
      }
    }
  