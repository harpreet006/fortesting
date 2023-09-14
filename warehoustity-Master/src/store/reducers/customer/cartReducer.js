import {
    CART,
    CART_BY_ID,
    CART_FAVORITE,
    CART_ID_LIST,
    IS_ERROR,
    IS_LOADING,
    IS_PENDING,
    ERROR_MESSAGE,
    CART_RESPONSE
  } from '../../types';
  
    
    const initialState = {
      isLoading:false,
      isPending:false,
      isError:"",
      isErrorMsg:"",
      cartList:null,
      cartIdList:null,
      cartDetail:[],
      cartFavorite:null,
      cartResponse:null
    }
  
    export function CARTINFO(state =initialState , action) {
      
      switch (action.type) {

          case CART:
            return {
                ...state,
                cartList:action.payload,
            };

          case CART_ID_LIST:
            return {
                ...state,
                cartIdList:action.payload,
            };

            case CART_FAVORITE:
              return {
                  ...state,
                  cartFavorite:action.payload,
              };
          
          case CART_BY_ID:
            return {
                ...state,
                cartDetail:action.payload,
            };

            case CART_RESPONSE:
            return {
                ...state,
                cartResponse:action.payload,
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
  