
import {
    ENQUIRY,
    ENQUIRY_BY_ID,
    IS_ERROR,
    IS_LOADING,
} from '../../types';

import {
    ENQUIRY_URL
  } from '../../../api/urls';

import axiosauth from '../../../api/axios-auth'

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


  export function enquiryList(data){
    return {
      type:ENQUIRY,
      payload:data
    }
  }

  export function enquiry_By_Id(data){
    return {
      type:ENQUIRY_BY_ID,
      payload:data
  }
  }


// ###########  Fecth All Warehouse List ########

  export const enguiryByPage = (page) =>{
    return async(dispatch) => {
      // dispatch(isLoading(true))
      dispatch(isError(""))
      let limit=10;
      try {
        axiosauth.get(ENQUIRY_URL+`?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(enquiryList(res))
            dispatch(isLoading(false))
        }
      }).catch((error) => {
          dispatch(isError(error.message))
          dispatch(isLoading(false))
      }).then(() => {
        dispatch(isLoading(false))
      })
    
    } catch(e) {}
    }
  }

  export const enguiryByPageVendor = (page) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let limit=10;
      try {
        axiosauth.get(`/api/v1/enquiry/vendor/enquiries?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(enquiryList(res))
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

export const enquiryById = (id, userType) =>{
  return async(dispatch) => {
    console.log("Id===>", id)
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.get(`/api/v1/enquiry/${id}/userType/${userType}`).then(response => {
      let res = JSON.parse(response.data)
      console.log("resss--->", res)
      if (res.statusCode === 200) { 
          dispatch(enquiry_By_Id(res.data))
          dispatch(isLoading(false))
      }
      else {
      console.log("booking Details Fail")
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



