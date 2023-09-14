
import {
    CATEGORY,
    IS_ERROR,
    IS_LOADING,
} from '../types';

import {
    CATEGORY_URL
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


  export function categoryList(data){
    console.log("categListt",data)
    return {
      type:CATEGORY,
      payload:data
    }
  }




// ###########  Fecth All Warehouse List ########

  export const categoryByPage = () =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.get(CATEGORY_URL+`?page=1&limit=100`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
             console.log("categList",res)
            dispatch(categoryList(res.data))
            // console.log("categList",res)
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


