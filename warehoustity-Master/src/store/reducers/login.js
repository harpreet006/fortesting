import {
  LOGIN_SUCCESS,
  SESSIONEXPIRED,
  AUTHENTICATED,
  VENDOR_AUTHENTICATED,
  IS_LOGIN_PENDING,
  USER_DETAIL,
  IS_ERROR,
  IS_LOADING,
  IS_PENDING,
  ERROR_MESSAGE,
  IS_SUCCESS,
} from '../types';


let initiatState = {
  userProfile:[],
  isSuccess:null,
  isLoading:false,
  isPending:false,
  isError:null,
  errorMessage:""
}

export function loginSuccess(state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.loginSuccess;
    default:
      return state;
  }
}


export function sessionExpiry(state = false, action) {
  switch (action.type) {
    case SESSIONEXPIRED:
      return action.session;
    default:
      return state;
  }
}


export function authenticated(state = false, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return action.authenticated;
    default:
      return state;
  }
}

export function vendorAuthenticated(state = false, action) {
  switch (action.type) {
    case VENDOR_AUTHENTICATED:
      return action.vendorauthenticated;
    default:
      return state;
  }
}

export function LOGIN_PENDING(state = false, action) {
  switch (action.type) {
    case IS_LOGIN_PENDING:
      return action.payload;
    default:
      return state;
  }
}



export function USERPROFILE(state = initiatState,  action) {
  switch (action.type) {
    case USER_DETAIL:
      return {
        ...state,
        userProfile :action.payload
      }
      case IS_ERROR:
      return {
        ...state,
        isError :action.payload
      }
      case IS_LOADING:
      return {
        ...state,
        isLoading :action.payload
      }

      case IS_PENDING:
        return {
          ...state,
          isPending :action.payload
        }

      case IS_SUCCESS:
      return {
        ...state,
        isSuccess :action.payload
      }
      case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage :action.payload
      }
     
    default:
      return state;
  }
}


