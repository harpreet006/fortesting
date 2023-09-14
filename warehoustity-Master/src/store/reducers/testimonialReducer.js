import {
    TESTIMONIAL,
    TESTIMONIAL_BY_ID,
    IS_ERROR,
    IS_LOADING
  } from '../types';
  
    
    const initialState = {
      isLoading:false,
      isError:"",
      isErrorMsg:"",
      testimonialList:null,
      testimonialDetail:null
    }
  
    export function TESTIMONIAL_INFO(state =initialState , action) {
      
      switch (action.type) {

          case TESTIMONIAL:
            return {
                ...state,
                testimonialList:action.payload,
            };
          
          case TESTIMONIAL_BY_ID:
            return {
                ...state,
                testimonialDetail:action.payload,
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
   