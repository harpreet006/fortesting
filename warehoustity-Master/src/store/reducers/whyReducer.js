import {
    WHYWHS,
    WHYWHS_BY_ID,
    WHY_RESPONSE,
    WHS_TYPE,
    IS_ERROR,
    IS_LOADING
  } from './../types';
  
    const initialState = {
      isLoading:false,
      isError:"",
      whyList:null,
      typeList:null,
      whyDetail:null,
      whyResponse:null
    }
  
    export function WHY_INFO(state =initialState , action) {
      
      switch (action.type) {

          case WHYWHS:
            return {
                ...state,
                whyList:action.payload,
            };

          case WHS_TYPE:
            return {
                ...state,
                typeList:action.payload,
            };
          
          case WHYWHS_BY_ID:
            return {
                ...state,
                whyDetail:action.payload,
            };
        
            case WHY_RESPONSE:
            return {
                ...state,
                whyResponse:action.payload,
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
  