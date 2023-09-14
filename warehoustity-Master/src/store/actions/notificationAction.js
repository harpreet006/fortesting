
import {
    NOTIFICATION,
    NOTIFICATION_BY_ID,
    IS_ERROR,
    IS_LOADING,
} from '../types';

import {
    NOTIFICATION_URL
  } from '../../api/urls';

import axiosauth from '../../api/axios-auth'

export function isError(error) {
  return {
    type: IS_ERROR,
    isError: error,
  };
}

export function isLoading(bool) {
  return {
    type: IS_LOADING,
    isLoading: bool,
  };
}


  export function notificationList(data){
    return {
      type:NOTIFICATION,
      payload:data
    }
  }

  export function notification_By_Id(data){
    return {
      type:NOTIFICATION_BY_ID,
      payload:data
  }
  }


// ###########  Fecth All Warehouse List ########

  export const notificationByPage = (page) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let limit=10;
      try {
        axiosauth.get(NOTIFICATION_URL+`?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(notificationList(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("notification Fail")
        }
      }).catch((error) => {
          dispatch(isError(error.message))
          dispatch(isLoading(false))
      }).then(() => {
        dispatch(isLoading(false))
          console.log("-----always executes");
      })
    
    } catch(e) {}
    }
  }



// ###########  Fetch Warehouse By Id ############

export const notificationById = (id) =>{
  return async(dispatch) => {
    console.log("Id===>", id)
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.get(NOTIFICATION_URL+`/${id}`).then(response => {
      let res = JSON.parse(response.data)
      console.log("resss--->", res)
      if (res.statusCode === 200) { 
          dispatch(notification_By_Id(res.data))
          dispatch(isLoading(false))
      }
      else {
      console.log("notification Details Fail")
      }
    }).catch((error) => {
      console.log("Fail--->", error.message)
        dispatch(isError(error.message))
        dispatch(isLoading(false))
    }).then(() => {
      dispatch(isLoading(false))
        console.log("-----always executes");
    })
  
  } catch(e) {

  }

  }
}



