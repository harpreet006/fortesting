
import {
    NEW_WARESHEET,
    WARESHEET_LIST,
    WARESHEET_BY_ID,
    IS_ERROR,
    IS_LOADING,
} from '../../types';

import {
    CREATE_WARESHEET_URL,
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


  export function addwaresheet(data){
    return {
      type:NEW_WARESHEET,
      payload:data
    }
  }


  export function waresheetList(data){
    return {
      type:WARESHEET_LIST,
      payload:data
    }
  }

  

// ###########  CREATE NEW WARESHEET ########

  export const createWaresheet = (data) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.post(CREATE_WARESHEET_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(addwaresheet(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("waresheet Fail")
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



// ###########  CREATE NEW WARESHEET ########

  export const allWaresheet = (page, limit) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.get(`/api/v1/waresheet?page=${page??1}&limit=${limit??10}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(waresheetList(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("waresheet Fail")
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

  export const allWaresheetLoader = (page, limit) =>{
    return async(dispatch) => {
      dispatch(isError(""))
      try {
        axiosauth.get(`/api/v1/waresheet?page=${page??1}&limit=${limit??10}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(waresheetList(res))
        }
      }).catch((error) => {
          dispatch(isError(error.message))
      }).then(() => {
          console.log("-----always executes");
      })
    
    } catch(e) {}
    }
  }


  export const getWaresheetById = (id) =>{
    return async(dispatch) => {
      dispatch(isError(""))
      try {
        axiosauth.get(`/api/v1/waresheet/${id}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch({
              type:WARESHEET_BY_ID,
              payload:res.data
            })
        }
      }).catch((error) => {
          dispatch(isError(error.message))
      }).then(() => {
          console.log("-----always executes");
      })
    
    } catch(e) {}
    }
  }