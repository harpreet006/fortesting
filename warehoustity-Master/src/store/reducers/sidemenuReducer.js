import {
    SIDEMENU,
    READ_ONLY,
    IS_ERROR,
    IS_LOADING,
    ERROR_MESSAGE
  } from './../types';
  
    
    const initialState = {
      isLoading:false,
      isError:"",
      isErrorMsg:"",
      sidemenu:null,
      read_only:false
    }
  
    export function SIDEMENU_INFO(state =initialState , action) {
      
      switch (action.type) {

          case SIDEMENU:
            return {
                ...state,
                sidemenu:action.payload,
            };
          
          case READ_ONLY:
            return {
                ...state,
                read_only:action.payload,
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
  