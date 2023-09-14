import {
    CUSTOMER_RFQ,
    CUSTOMERRFQ_BY_ID,
    RFQ_RESPONSE,
    RFQ_INITIAL_DETAIL,
    IS_ERROR,
    IS_LOADING,
    IS_PENDING,
    ERROR_MESSAGE,
    INITIAL_EMPTY,
    RFQ_FIRST_FORM
  } from '../../types';
  
    
    const initialState = {
      isLoading:false,
      isPending:false,
      isError:"",
      isErrorMsg:"",
      rfqInitialDetail:{},
      rfqFirstForm:null,
      rfqList:[],
      rfqDetail:[],
      rfqResponse:[]
    }
  
    export function CUSTOMER_RFQ_INFO(state =initialState , action) {
      switch (action.type) {

          case CUSTOMER_RFQ:
            return {
                ...state,
                rfqList:action.payload,
            };
          
          case RFQ_FIRST_FORM:
            return {
                ...state,
                rfqFirstForm:action.payload,
            };
          
            case CUSTOMERRFQ_BY_ID:
              return {
                  ...state,
                  rfqDetail:action.payload,
              };
  

            case RFQ_INITIAL_DETAIL:
                return {
                    ...state,
                    rfqInitialDetail:{...state.rfqInitialDetail,
                    ...action.payload.data},
                };

            case INITIAL_EMPTY:
              return {
                  ...state,
                  rfqInitialDetail:action.payload,
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
  