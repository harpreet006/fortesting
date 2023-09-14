
import {
    FAVORITE_LIST,
    FAVORITE_ID,
    IS_ERROR,
    IS_LOADING,
    IS_PENDING,
} from '../../types';

import {
    FAVORITE_GET_URL,
    FAVORITE_DEL_URL,
    FAVORITE_POST_URL
  } from '../../../api/urls';

import axiosauth from '../../../api/axios-auth';
import {getAllCart} from './../customer/cartAction';

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

  export function favoriteList(data){
    return {
      type:FAVORITE_LIST,
      payload:data
    }
  }

  export function favoriteListIds(data){
    return {
      type:FAVORITE_ID,
      payload:data
    }
  }



// ###########  Fecth favorite List ########

  export const favoriteByPage = () =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.get(FAVORITE_GET_URL).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(favoriteList(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("favorite Fail")
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

  
// ###########  Fecth favorite List without loader ########

export const favoriteByPageLoader = () =>{
  return async(dispatch) => {
    dispatch(isError(""))
    try {
      axiosauth.get(FAVORITE_GET_URL).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 200) { 
          dispatch(favoriteList(res))
      }
      else {
      console.log("favorite Fail")
      }
    }).catch((error) => {
        dispatch(isError(error.message))
    }).then(() => {
        console.log("-----always executes");
    })
  
  } catch(e) {}
  }
}


// Favorite id
export const favoriteIds = () =>{
  return async(dispatch) => {
    dispatch(isError(""))
    try {
      axiosauth.get(FAVORITE_GET_URL).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 200) { 
        let ids = []
        if( res.data?.favoritesWarehouses &&  res.data?.favoritesWarehouses.length>0){
          for(let i=0; i<res.data?.favoritesWarehouses.length; i++){
            
            ids.push(res.data?.favoritesWarehouses[i].id)
          }
        }
          dispatch(favoriteListIds(ids))
      }
      else {
      console.log("favorite Fail")
      }
    }).catch((error) => {
        dispatch(isError(error.message))
    }).then(() => {
        console.log("-----always executes");
    })
  
  } catch(e) {}
  }
}

//   Add FAVORITE

export const favoriteAdd = (id, addToast) =>{
    return async(dispatch) => {
      dispatch(isError(""))
      try {
        axiosauth.post(FAVORITE_POST_URL+`/${id}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
          addToast("Added to Favorite", { appearance: "success", autoDismiss: true });
          dispatch(favoriteIds())
        }
        else {
        console.log("favorite Fail")
        }
      }).catch((error) => {
          dispatch(isError(error.message))
      }).then(() => {
          console.log("-----always executes");
      })
    
    } catch(e) {}
    }
  }


//   DELETE FAVORITE

export const favoriteRemove = (id, addToast) =>{
    return async(dispatch) => {
      dispatch(isPending(false))
      dispatch(isError(""))
      try {
        axiosauth.delete(FAVORITE_DEL_URL+`/${id}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
          addToast("Removed From Favorite", { appearance: "error", autoDismiss: true });
           dispatch(favoriteByPageLoader())
           dispatch(favoriteIds())
          dispatch(isPending(false))
         
        }
        else {
        console.log("favorite Fail")
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


  // Move and Remove from favorite

  export const favoriteMoveToCart = (id, addToast) =>{
    return async(dispatch) => {
      try {
        axiosauth.delete(FAVORITE_DEL_URL+`/${id}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
           dispatch(favoriteByPageLoader())
           dispatch(favoriteIds())
           dispatch(getAllCart())
          dispatch(isPending(false))
         
        }
      }).catch((error) => {
          dispatch(isError(error.message))
          dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
      })
    
    } catch(e) {}
    }
  }


