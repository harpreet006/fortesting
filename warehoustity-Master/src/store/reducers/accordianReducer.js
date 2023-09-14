import {
    ACTIVE_ACCORDIAN
} from '../types';

    const initialState = {
      isActive:null,
     
    }
  

    export function ACCORDIAN_INFO(state =initialState , action) {
      
        switch (action.type) {
  
            case ACTIVE_ACCORDIAN:
              return {
                  ...state,
                  isActive:action.payload,
              };
            
          
          default:
            return state;
        }
      }
    