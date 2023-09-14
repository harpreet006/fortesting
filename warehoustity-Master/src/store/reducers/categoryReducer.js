import {
    CATEGORY,
    IS_ERROR,
    IS_LOADING,
    ERROR_MESSAGE
  } from '../types';
  
    
    const initialState = {
      isLoading:false,
      isError:"",
      isErrorMsg:"",
      categoryList:[]
    }
  
    export function CATEGORY_INFO(state =initialState , action) {
      
      switch (action.type) {

          case CATEGORY:
            return {
                ...state,
                categoryList:action.payload,
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
        
        case ERROR_MESSAGE:
          return {
                ...state,
                isErrorMsg:action.payload,
            };
    
        default:
          return state;
      }
    }
  