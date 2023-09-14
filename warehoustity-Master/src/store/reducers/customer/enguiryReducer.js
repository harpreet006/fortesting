import {
    ENQUIRY,
    ENQUIRY_BY_ID,
    IS_ERROR,
    IS_LOADING,
    ERROR_MESSAGE
  } from '../../types';
  
    
    const initialState = {
      isLoading:false,
      isError:"",
      isErrorMsg:"",
      enquiryList:[],
      enquiryDetail:[]
    }
  
    export function ENQUIRYINFO(state =initialState , action) {
      
      switch (action.type) {

          case ENQUIRY:
            return {
                ...state,
                enquiryList:action.payload,
            };
          
          case ENQUIRY_BY_ID:
            return {
                ...state,
                enquiryDetail:action.payload,
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
  