
import {
    HOMEDATA,
    HOME_COUNT,
    IS_ERROR,
    IS_LOADING
} from '../types';

import {
    HOMEPAGE_URL
  } from '../../api/urls';

import axiosauth from '../../api/axios-auth';

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


  export function homeData(data){
    return {
      type:HOMEDATA,
      payload:data
    }
  }

  export function home_count(data){
    return {
      type:HOME_COUNT,
      payload:data
    }
  }


  // ###########  Fecth All Warehouse List By Page Number ########

  export const homePage = () =>{
    
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.get(HOMEPAGE_URL).then(response => {
        let res = JSON.parse(response.data)
       
        if (res.statusCode === 200) { 
            dispatch(homeData(res))
        }
      }).catch((error) => {
          dispatch(isError(error.message))
      }).then(() => {
        dispatch(isLoading(false))
      })
    
    } catch(e) {

    }

    }
  }



  export const warehouseCount = (state) =>{
    
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let filter = {
        "filter": {
            "state": state
        }
    }
      try {
        axiosauth.post(`/api/v1/warehouses/city/counts`, filter).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(home_count(res.data))
            dispatch(isLoading(false))
        }
      }).catch((error) => {
          dispatch(isError(error.message))
          dispatch(isLoading(false))
      }).then(() => {
        dispatch(isLoading(false))
      })
    
    } catch(e) {

    }

    }
  }


