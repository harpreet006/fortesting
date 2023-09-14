import {
    TERM_AND_CONDITION,
    DROPDOWN,
    SIGNUP_POPUP,
} from '../types';



export function termAndCondition(data) {
  return {
    type: TERM_AND_CONDITION,
    payload: data,
  };
}


export function dropDown(data) {
  return {
    type: DROPDOWN,
    payload: data,
  };
}

export function signUpPopup(data){
  return {
    type:SIGNUP_POPUP,
    payload: data
  }
}


