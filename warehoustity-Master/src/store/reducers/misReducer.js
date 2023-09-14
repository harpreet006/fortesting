import {
    MIS_BOOKING,
    MIS_BOOKING_BY_ID,
    MIS,
    MIS_BY_ID,
    IS_ERROR,
    IS_LOADING,
    MIS_RESPONSE,
    IS_PENDING
  } from '../types';
  
    const initialState = {
      isLoading:false,
      isPending:false,
      isError:"",
      isErrorMsg:"",
      misList:null,
      misResponse:null,
      misBookingList:null,
      misBookingDetail:null,
      misDetail:null
    }
  
    export function MIS_INFO(state =initialState , action) {
      
      switch (action.type) {

        case MIS_BOOKING:
            return {
                ...state,
                misBookingList:action.payload,
            };

            case IS_PENDING:
              return {
                  ...state,
                  isPending:action.payload,
              };

              case MIS_RESPONSE:
                return {
                    ...state,
                    misResponse:action.payload,
                };

            case MIS_BOOKING_BY_ID:
              return {
                  ...state,
                  misBookingDetail:action.payload,
              };

          case MIS:
            return {
                ...state,
                misList:action.payload,
            };
          
          case MIS_BY_ID:
            return {
                ...state,
                misDetail:action.payload,
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
   