
import {
  WHYWHS,
  WHYWHS_BY_ID,
  WHY_RESPONSE,
  WHS_TYPE,
  IS_ERROR,
  IS_LOADING
} from './../types';

import {
  WHYWHS_URL
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



export function whyList(data) {
  return {
    type: WHYWHS,
    payload: data
  }
}

export function typeList(data) {
  return {
    type: WHS_TYPE,
    payload: data
  }
}

export function why_By_Id(data) {
  return {
    type: WHYWHS_BY_ID,
    payload: data
  }
}

export function responseWhy(data) {
  return {
    type: WHY_RESPONSE,
    payload: data
  }
}


// ###########  Fecth All categoryList ########

export const whyByPage = (obj) => {
  return async (dispatch) => {
    const { page, limit } = obj;
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.get(WHYWHS_URL + `?page=${page ?? 1}&limit=${limit ?? 10}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {
          dispatch(whyList(res))
          dispatch(isLoading(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isLoading(false))
      }).then(() => {
        dispatch(isLoading(false))
      })

    } catch (e) { }
  }
}


// ###########  Fecth  category Detail By Id ########

export const whyById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.get(WHYWHS_URL + `/${id}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {
          dispatch(why_By_Id(res.data))
          dispatch(isLoading(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isLoading(false))
      }).then(() => {
        dispatch(isLoading(false))
      })

    } catch (e) { }
  }
}




// Warehouse type for homepage 

export const typeByPage = () => {
  return async (dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    let filter = {
      "filter": {}
    }
    try {
      axiosauth.post(`/api/v1/warehousetype/all?page=${1}&limit=${10}`, filter).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {
          dispatch(typeList(res))
          dispatch(isLoading(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isLoading(false))
      }).then(() => {
        dispatch(isLoading(false))
      })

    } catch (e) { }
  }
}

