
import {
    CART,
    CART_BY_ID,
    CART_ID_LIST,
    CART_FAVORITE,
    IS_ERROR,
    IS_LOADING,
    IS_PENDING,
    CART_RESPONSE
} from '../../types';

import {
    CART_URL,
    FAVORITE_GET_URL
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

export function isPending(bool) {
  return {
    type: IS_PENDING,
    isPending: bool,
  };
}

export function cartFavList(data){
  return {
    type:CART_FAVORITE,
    payload:data
  }
}

  export function cartList(data){
    return {
      type:CART,
      payload:data
    }
  }

  export function cart_By_Id(data){
    return {
      type:CART_BY_ID,
      payload:data
  }
  }

  export function responseCart(data){
    return {
      type:CART_RESPONSE,
      payload:data
  }
  }

  export function cartIdList(data){
    return {
      type:CART_ID_LIST,
      payload:data
    }
  }


  // #########################################
  // ########  Cart ###### 
  // #########################################

  export const addToCart = (data, addToast) =>{
    return async(dispatch) => {
      dispatch(isPending(true))
      dispatch(isError(""))
      try {
        axiosauth.post(CART_URL, data).then(response => {
        let res = JSON.parse(response.data)
        
        if (res.statusCode === 200) { 
          
            addToast("Added to Cart", { appearance: "success", autoDismiss: true });
            // dispatch(responseCart(res))
            dispatch(getAllCart())
            dispatch(isPending(false))
        }
        if (res.statusCode === 500) { 
          addToast("Already Added in Cart", { appearance: "success", autoDismiss: true });
          // dispatch(responseCart(res))
          dispatch(isPending(false))
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


  export const getAllCart = () =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      dispatch(cartList(null))

      try {
        axiosauth.get(CART_URL).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {
          console.log("res",res.data.id)
            dispatch(cartList(res))
            let idList = []
            console.log("idList",idList)
            for(let i=0; i<res.data?.warehouses?.length; i++){
              idList.push(res.data?.warehouses[i].id)
            }
            dispatch(cartIdList(idList))
        }
      }).catch((error) => {
          dispatch(isError(error.message))
      }).then(() => {
        dispatch(isLoading(false))
      })
    } catch(e) {}
    }
  }


  // get RFQ CART
  export const getRfqCart = () =>{
    return async(dispatch) => {
      try {
        axiosauth.get(CART_URL).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(cartFavList(res.data?.warehouses))
        }
      }).catch((error) => {
          dispatch(isError(error.message))
      }).then(() => {
      })
    } catch(e) {}
    }
  }

  // Get RFQ Favotite
  export const getRfqFav = () =>{
    return async(dispatch) => {
      try {
        axiosauth.get(FAVORITE_GET_URL).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(cartFavList(res.data?.favoritesWarehouses))
        }
      }).catch((error) => {
          dispatch(isError(error.message))
      }).then(() => {
      })
    
    } catch(e) {}
    }
  }




  export const cartById = (id) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.get(CART_URL+`/${id}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(cart_By_Id(res.data))
            dispatch(isLoading(false))
        }
        else {
        console.log("Cart Fail")
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


  export const deleteCartItem = (cardData) =>{
    console.log("kk",cardData)
    return async(dispatch) => {
      dispatch(isPending(true))
      dispatch(isError(""))
      try {
        axiosauth.post(`/api/v1/cart/deletecarts`, cardData).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(responseCart(res))
            dispatch(getAllCart())
            dispatch(isPending(false))
        }
        else {
        console.log("Cart Fail")
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