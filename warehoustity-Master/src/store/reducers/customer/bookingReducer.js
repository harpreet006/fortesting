import {
    BOOKING,
    BOOKING_BY_ID,
    IS_ERROR,
    IS_LOADING,
    IS_PENDING,
    ERROR_MESSAGE,
    BOOKING_RESPONSE,
    BOOKING_LIST_WAREHOUSE
  } from '../../types';
  
    
    const initialState = {
      isLoading:false,
      isPending:false,
      isError:"",
      isErrorMsg:"",
      bookingList:[],
      bookingListWarehouse:[],
      bookingDetail:[],
      bookingResponse:null
    }
  
    export function BOOKINGINFO(state =initialState , action) {
      
      switch (action.type) {

          case BOOKING:
            return {
                ...state,
                bookingList:action.payload,
            };

            case BOOKING_LIST_WAREHOUSE:
              return {
                ...state,
                bookingListWarehouse:action.payload
              }
          
          case BOOKING_BY_ID:
            return {
                ...state,
                bookingDetail:action.payload,
            };

            case BOOKING_RESPONSE:
            return {
                ...state,
                bookingResponse:action.payload,
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
  