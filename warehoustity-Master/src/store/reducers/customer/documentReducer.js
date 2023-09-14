import {
    DOCUMENT,
    DOCUMENT_BY_ID,
    IS_ERROR,
    IS_LOADING,
    ERROR_MESSAGE
  } from '../../types';
  
    
    const initialState = {
      isLoading:false,
      isError:"",
      isErrorMsg:"",
      documentList:[],
      documentDetail:[]
    }
  
    export function CUSTOMER_DOCUMENT(state =initialState , action) {
      
      switch (action.type) {

          case DOCUMENT:
            return {
                ...state,
                documentList:action.payload,
            };
          
          case DOCUMENT_BY_ID:
            return {
                ...state,
                documentDetail:action.payload,
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
  