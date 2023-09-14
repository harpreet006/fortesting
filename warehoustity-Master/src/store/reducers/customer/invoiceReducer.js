import {
    INVOICE,
    INVOICE_BY_ID,
    INVOICE_RESPONSE,
    IS_ERROR,
    IS_LOADING,
    ERROR_MESSAGE
  } from '../../types';
  
    
    const initialState = {
      isLoading:false,
      isError:"",
      isErrorMsg:"",
      invoiceList:[],
      invoiceDetail:[],
      invoiceResponse:null
    }
  
    export function INVOICEINFO(state =initialState , action) {
      
      switch (action.type) {

          case INVOICE:
            return {
                ...state,
                invoiceList:action.payload,
            };
          
          case INVOICE_RESPONSE:
            return {
                ...state,
                invoiceResponse:action.payload,
            };
          
          case INVOICE_BY_ID:
            return {
                ...state,
                invoiceDetail:action.payload,
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
  