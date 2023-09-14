import {
    FAVORITE_LIST,
    FAVORITE_ID,
    IS_ERROR,
    IS_LOADING,
    IS_PENDING,
    ERROR_MESSAGE,
  } from '../../types';
  
    
    const initialState = {
      isLoading:false,
      isPending:false,
      isError:"",
      isErrorMsg:"",
      favoriteList:[],
      favoriteListIds:[]
    }
  
    export function FAVORITEINFO(state =initialState , action) {
      
      switch (action.type) {

        case FAVORITE_LIST:
          return {
              ...state,
              favoriteList:action.payload,
          };

          case FAVORITE_ID:
          return {
              ...state,
              favoriteListIds:action.payload,
          };
        
        case IS_LOADING: 
          return {
              ...state,
              isLoading:action.isLoading,
          };

          case IS_PENDING: 
          return {
              ...state,
              isPending:action.isPending,
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
  