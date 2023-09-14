import {
  HOMEDATA,
  HOME_COUNT,
  IS_ERROR,
  IS_LOADING,
  ERROR_MESSAGE
} from '../types';

  
  const initialState = {
    isLoading:false,
    isError:"",
    isErrorMsg:"",
    homeDetail:[],
    homeCount:null
  }

  export function HOMEINFO(state =initialState , action) {
    
    switch (action.type) {
     
        case IS_LOADING:
          
          return {
              ...state,
              isLoading:action.isLoading,
          };

      case HOMEDATA:
        return {
            ...state,
            homeDetail:action.payload,
        };

        case HOME_COUNT:
          return {
              ...state,
              homeCount:action.payload,
          };
      
      case IS_ERROR:
        return {
            ...state,
            isError:action.isError,
        };
      
      case ERROR_MESSAGE:
        return {
              ...state,
              isErrorMsg:action.payload,
          };
  

      default:
        return state;
    }
  }
