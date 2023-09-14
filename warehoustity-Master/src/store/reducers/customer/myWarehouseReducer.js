import {
    MYWAREHOUSE,
    MYWAREHOUSE_BY_ID,
    IS_ERROR,
    IS_LOADING,
    CUSTOMERGSTLIST,
    ERROR_MESSAGE,
    VENDORGSTLIST
  } from '../../types';
  
    
    const initialState = {
      isLoading:false,
      isError:"",
      isErrorMsg:"",
      myWarehouseList:[],
      myWarehouseDetail:[],
      gstCustomer:[],
      gstVendor:[]
    }
  
    export function MYWAREHOUSEINFO(state =initialState , action) {
      
      switch (action.type) {

          case MYWAREHOUSE:
            return {
                ...state,
                myWarehouseList:action.payload,
            };
          case CUSTOMERGSTLIST:
            return{
              ...state,
              gstCustomer:action.payload
            }
            case VENDORGSTLIST:
              return{
                ...state,
                gstVendor:action.payload
              }
          case MYWAREHOUSE_BY_ID:
            return {
                ...state,
                myWarehouseDetail:action.payload,
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
  