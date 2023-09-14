import {
    TERM_AND_CONDITION,
    DROPDOWN,
    SIGNUP_POPUP
} from '../types';

const initialState = {
termAndCondition:true,
isDropdown:null,
isSignUpPopup:null
}
  
export function COMMAN_INFO(state =initialState , action) {
    
    switch (action.type) {

        case TERM_AND_CONDITION:
            return {
                ...state,
                termAndCondition:action.payload,
            };
        
        case DROPDOWN:
        return {
            ...state,
            isDropdown:action.payload,
        };
        
        case SIGNUP_POPUP:
        return {
            ...state,
            isSignUpPopup:action.payload,
        };
        
        default:
        return state;
    }
    }
    