
import {
    REVIEW,
    REVIEW_RESPONSE,
    IS_ERROR,
    IS_LOADING,
} from '../types';

import {
    REVIEW_URL,
    ADD_REVIEW_URL
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

  export function reviewDetail(data){
    return {
      type:REVIEW,
      payload:data
    }
  }

  export function reviewResponse(data){
    return {
      type:REVIEW_RESPONSE,
      payload:data
    }
  }


// ###########  Create List ########

  export const createReview = (data, addToast) =>{
    return async(dispatch) => {
      try {
        axiosauth.post(ADD_REVIEW_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
          dispatch(getReview(data.warehouse))
          addToast("Review & Rating Added", { appearance: "success", autoDismiss: true });
          dispatch(reviewResponse(res))
        }
      }).catch((error) => {
          dispatch(isError(error.message))
      }).then(() => {
      })
    
    } catch(e) {}
    }
  }


  export const getReview = (id) =>{
    return async(dispatch) => {
      try {
        axiosauth.get(REVIEW_URL + `/${id}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {
            dispatch(reviewDetail(res.data))
        }
      }).catch((error) => {
          dispatch(isError(error.message))
      }).then(() => {
      })
    
    } catch(e) {}
    }
  }


