import {
 SUCCESS,
 PENDING,
 ERROR,
 REGISTER_MOBILE_NUMBER,
 UPDATE_MOBILE_NUMBER,
 OTP_RESEND_MESSAGE,
 MOBILE_VERIFICATION_ERROR,
 MOBILE_VERIFICATION_SUCCESS,
 MOBILE_VERIFICATION_PENDING,
 OTP_VERIFICATION_ERROR,
 OTP_VERIFICATION_PENDING,
 OTP_VERIFICATION_SUCCESS,
 OTP_VERIFICATION_CONFIRM,
 CREATE_ROLE_SUCCESS,
 CREATE_ROLE_ERROR,
 CREATE_ROLE_PENDING
} from '../types';

const intialState = {
  type: null,
  error: null,
  list: {}
}

export function PENDINGDATA(state = false, action) {
    switch (action.type) {
      case PENDING:
        return action.product;
      default:
        return state;
    }
  }

  export function SUCCESSDATA(state = false, action) {
    switch (action.type) {
      case SUCCESS:
        return action.product;
      default:
        return state;
    }
  }

  export function ERRORDATA(state = null, action) {
    switch (action.type) {
      case ERROR:
        return action.product;
      default:
        return state;
    }
  }
  

  export function otpVerified(state = {
      loading:false,
      error:null,
      success:false,
      confirm:false,
      registerMobile:null,
      otpResendMessage:null,
      updateMobileMessage:null
  }, action) {
    switch (action.type) {
      case OTP_VERIFICATION_ERROR:
        return {
            ...state,
            error:action.payload,
            confirm:false
        };
      
        case REGISTER_MOBILE_NUMBER:
          return {
              ...state,
              registerMobile:action.payload
          };

          case UPDATE_MOBILE_NUMBER:
            return {
                ...state,
                updateMobileMessage:action.payload
            };

          case OTP_RESEND_MESSAGE:
            return {
                ...state,
                otpResendMessage:action.payload
            };

      case OTP_VERIFICATION_PENDING:
        return  {
            ...state,
            loading:action.payload,
        };
      case OTP_VERIFICATION_SUCCESS:
        return  {
            ...state,
            success:action.payload,
        };
    case OTP_VERIFICATION_CONFIRM:
        return  {
            ...state,
            confirm:action.payload
        };
      default:
        return state;
    }
  }


export default (state = intialState, action) => {
  switch(action.type){
      case PENDING:
          return {
              ...state,
              ...action,
              error: null
          }
      case SUCCESS:
          return {
              ...state,
              ...action,
              error: null
          }
      case ERROR:
          return {
              ...state,
              ...action
          }              
    case MOBILE_VERIFICATION_PENDING:
          return {
              ...state,
              ...action,
              error: null
          }
      case MOBILE_VERIFICATION_SUCCESS:
          return {
              ...state,
              ...action,
              error: null
          }
      case MOBILE_VERIFICATION_ERROR:
          return {
              ...state,
              ...action
          }    
      case OTP_VERIFICATION_PENDING:
          return {
              ...state,
              ...action,
              error: null
          }
      case OTP_VERIFICATION_SUCCESS:
          return {
              ...state,
              ...action,
              error: null
          }
      case OTP_VERIFICATION_ERROR:
          return {
              ...state,
              ...action
          }
          case CREATE_ROLE_PENDING:
            return {
                ...state,
                ...action,
                error: null
            }
        case CREATE_ROLE_SUCCESS:
            return {
                ...state,
                ...action,
                error: null
            }
        case CREATE_ROLE_ERROR:
            return {
                ...state,
                ...action
            }              
      default:
          return state
  }
}