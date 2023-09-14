import {
    NOTIFICATION,
    NOTIFICATION_BY_ID,
    IS_ERROR,
    IS_LOADING,
    ERROR_MESSAGE
  } from '../types';
  
    
    const initialState = {
      isLoading:false,
      isError:"",
      isErrorMsg:"",
      notificationList:[],
      notificationDetail:[]
    }
  
    export function NOTIFICATIONINFO(state =initialState , action) {
      
      switch (action.type) {

          case NOTIFICATION:
            return {
                ...state,
                notificationList:action.payload,
            };
          
          case NOTIFICATION_BY_ID:
            return {
                ...state,
                notificationDetail:action.payload,
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
  