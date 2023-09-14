import {
    RFQ_RESPONSE,
    IS_ERROR,
    IS_LOADING,
    ERROR_MESSAGE,
     VENDOR_RFQ,
    VENDOR_BY_ID,
    IS_PENDING,
  } from '../../types';
  
    
    const initialState = {
      isLoading:false,
      isPending:false,
      isError:"",
      isErrorMsg:"",
      rfqList:[],
      rfqDetail:[],
      rfqResponse:[]
    }
  
    export function VENDOR_RFQ_INFO(state =initialState , action) {
      
      switch (action.type) {

          case VENDOR_RFQ:
            return {
                ...state,
                rfqList:action.payload,
            };
          
          case VENDOR_BY_ID:
            return {
                ...state,
                rfqDetail:action.payload,
            };

          
            case RFQ_RESPONSE:
            return {
                ...state,
                rfqResponse:action.payload,
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
  