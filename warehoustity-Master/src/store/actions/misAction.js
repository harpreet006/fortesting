
import {
    MIS,
    MIS_BOOKING,
    MIS_BOOKING_BY_ID,
    MIS_BY_ID,
    IS_ERROR,
    IS_LOADING,
    IS_PENDING,
    MIS_RESPONSE,
} from '../types';

import {
  GET_MIS_URL,
  GET_MIS_BOOKING_URL,
  GET_BOOKING_MIS_URL
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

export function isPending(bool) {
  return {
    type: IS_PENDING,
    isPending: bool,
  };
}

  export function misBookingList(data){
    return {
      type:MIS_BOOKING,
      payload:data
    }
  }

  export function misBookingByBooking(data){
    return {
      type:MIS_BOOKING_BY_ID,
      payload:data
    }
  }

  export function misList(data){
    return {
      type:MIS,
      payload:data
    }
  }

  export function mis_By_Id(data){
    return {
      type:MIS_BY_ID,
      payload:data
  }
  }

  export function misResponse(data){
    return {
      type:MIS_RESPONSE,
      payload:data
    }
  }



  // ###########  Mis Post Request ########

  export const createMis = (data) =>{
    return async(dispatch) => {
      dispatch(isPending(true))
      dispatch(isError(""))
      try {
        axiosauth.post(GET_MIS_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(misResponse(res))
            dispatch(isPending(false))
        }
        else {
        console.log("mis Fail")
        }
      }).catch((error) => {
          dispatch(isError(error.message))
          dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
          console.log("-----always executes");
      })
    } catch(e) {}
    }
  }




// ###########  Mis Booking List ########

  export const misBookingByPage = (page) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let limit=10;
      try {
        axiosauth.get(GET_MIS_BOOKING_URL+`?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(misBookingList(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("mis Fail")
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


  

// ###########  Mis Booking List ########

export const misBookingByBookingId = (id) =>{
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))

    try {
      axiosauth.get(GET_BOOKING_MIS_URL+`/${id}`).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 200) { 
          dispatch(misBookingByBooking(res.data))
          dispatch(isLoading(false))
      }
      else {
      console.log("mis Fail")
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


  // ###########  Mis List ########

  export const misByPage = (page) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let limit=10;
      try {
        axiosauth.get(GET_MIS_URL+`?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(misList(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("mis Fail")
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

 // ###########  Mis List ########

 export const misReportById = (id) =>{
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.get(`/api/v1/mis/${id}`).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 200) { 
          dispatch(misList(res))
          dispatch(isLoading(false))
      }
      else {
      console.log("mis Fail")
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

