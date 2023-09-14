import {
  LOGIN_SUCCESS,
  SESSIONEXPIRED,
  AUTHENTICATED,
  VENDOR_AUTHENTICATED,
  USER_DETAIL,
  IS_LOGIN_PENDING,
  IS_SUCCESS,
  IS_PENDING
} from '../types';


import {LOGIN_USER, USER_PROFILE_URL, UPDATE_PROFILE_URL} from '../../api/urls'

import axiosauth from '../../api/axios-auth';

  
import { isLoading, isError, errorMessage } from './utils';
  
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    loginSuccess: user,
  };
}


export function isLogPending(data) {
  return {
    type: IS_LOGIN_PENDING,
    payload: data,
  };
}


export function isPending(data) {
  return {
    type: IS_PENDING,
    payload: data,
  };
}

export function sessionexpire(user) {
  return {
    type: SESSIONEXPIRED,
    session: user,
  };
}

export function authenticated(bool) {
  return {
    type: AUTHENTICATED,
    authenticated: bool,
  };
}

export function vendorAuthenticated(bool) {
  return {
    type: VENDOR_AUTHENTICATED,
    vendorauthenticated: bool,
  };
}

export function userDetail(user){
  return {
    type: USER_DETAIL,
    payload: user,
  };
}


export function successResponse(user) {
  return {
    type: IS_SUCCESS,
    payload: user,
  };
}



export function loginUser(arg) {
  return async(dispatch) => {
    try {
      
      localStorage.setItem('accesstoken',arg);
      if(localStorage.getItem('userType')==="userDashboard"){
        dispatch(authenticated(true));
      }
      if(localStorage.getItem('userType')==="vendor"){
        dispatch(vendorAuthenticated(true));
      }
    } catch(e) {
      dispatch(isError(true));
      dispatch(errorMessage(e.message));
      dispatch(isLoading(false));
    }
  };
}

export function userLogin(data, userType){
  return (dispatch) => {
    dispatch(isLogPending(true));
    dispatch(isError(false));

    axiosauth
        .post(LOGIN_USER, data)
        .then((response) => {
          const res = JSON.parse(response.data);
        
          if (res.statusCode === 200) {
             dispatch(errorMessage(null))
             if(res.data.user.roleId === 2 && userType=== 2){
              localStorage.setItem("userType", "userDashboard");
              localStorage.setItem("userData", JSON.stringify(res.data.user))
              localStorage.setItem('accesstoken',res.data.token);
              localStorage.setItem("customerService", 20);
              dispatch(authenticated(true));
              dispatch(loginSuccess("Login Successful"))
              dispatch(authProfile())
             }

             if(res.data.user.roleId === 3 && userType=== 3){
              localStorage.setItem("userType", "vendor");
              localStorage.setItem("userData", JSON.stringify(res.data.user))
              localStorage.setItem('accesstoken',res.data.token);
             
              dispatch({
                type: VENDOR_AUTHENTICATED,
                vendorauthenticated: true,
              });
              dispatch(loginSuccess("Login Successful"))
              dispatch(authProfile())
             }

             if(res.data.user.roleId !==  userType){
              dispatch(errorMessage("Invalid credentials"));
              setTimeout(()=>{
                dispatch(errorMessage(null));
              }, 5000)
             }
          
            
          } else {
            console.log(res.message);
            dispatch(loginSuccess(res.message))
            dispatch(errorMessage(res.message));
          
          }
     
      }).catch((error) => {
       
        console.log("json",error?.response?.data)
          let msg = JSON.parse(error?.response?.data)
          dispatch(loginSuccess(error.message))
         
          dispatch(isError(true));
          console.log(error.message)
          dispatch(errorMessage(msg.message));
      }).then(() => {
        dispatch(isLogPending(false));
          console.log("-----always executes");
      })
          
  };
}




export function authProfile(){
  return (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(false));
    dispatch(errorMessage(null))
    axiosauth
        .get(USER_PROFILE_URL)
        .then((response) => {
          const res = JSON.parse(response.data);         
          if (res.statusCode === 200) {
           dispatch(userDetail(res.data))
          // console.log("User Profile==>", res.data)

          } else {
            console.log(res.message);
            dispatch(errorMessage(res.message));
             dispatch(isLoading(false));
          }
     
      }).catch((error) => {
          console.log(error);
          dispatch(isLoading(false));
          dispatch(errorMessage(error.message));
      }).then(() => {
        dispatch(isLoading(false));
          console.log("-----always executes");
      })
          
  };
}



export function authProfileLoader(){
  return (dispatch) => {
    dispatch(isError(false));
    dispatch(errorMessage(null))
    axiosauth
        .get(USER_PROFILE_URL)
        .then((response) => {
          const res = JSON.parse(response.data);
          if (res.statusCode === 200) {
           dispatch(userDetail(res.data))
          } else {
            console.log(res.message);
            dispatch(errorMessage(res.message));
          }
     
      }).catch((error) => {
          console.log(error);
          dispatch(errorMessage(error.message));
      })
          
  };
}


export function userUpdate(user){
  return (dispatch) => {
    dispatch(isPending(true));
    dispatch(isError(false));
    dispatch(errorMessage(null))
    dispatch(successResponse(null))
    console.log("User==>", user)
    axiosauth
        .put(UPDATE_PROFILE_URL, user)
        .then((response) => {
          const res = JSON.parse(response.data);
          console.log("Update Res==--->", res)
         
          if (res.statusCode === 200) {
            dispatch(successResponse(res))
          dispatch(authProfileLoader())
          dispatch(isPending(false))
          console.log("User Update Profile Res==>", res.data)

          } else {
            console.log(res.message);
            dispatch(errorMessage(res.message));
             dispatch(isPending(false));
          }
     
      }).catch((error) => {
          console.log(error);
          dispatch(isPending(false));
          dispatch(errorMessage(error.message));
      }).then(() => {
        dispatch(isPending(false));
          console.log("-----always executes");
      })
          
  };
}









export function logoutUser() {
  localStorage.clear();
  return (dispatch) => {
    dispatch(loginSuccess({}));
    dispatch(authenticated(false));
    dispatch(vendorAuthenticated(false));
    dispatch(isError(false));
    dispatch(isLoading(false));
    dispatch(errorMessage(null));
    dispatch(userDetail([]));
  
  };
}

