import {
    REVIEW,
    REVIEW_RESPONSE,
    IS_ERROR,
    IS_LOADING
  } from '../types';
  
    
    const initialState = {
      isLoading:false,
      isError:"",
      isErrorMsg:"",
      reviewDetail:null,
      reviewResponse:null
    }
  
    export function REVIEW_INFO(state =initialState , action) {
      
      switch (action.type) {

          case REVIEW:
            return {
                ...state,
                reviewDetail:action.payload,
            };

            case REVIEW_RESPONSE:
                return {
                      ...state,
                      reviewResponse:action.payload,
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
  
