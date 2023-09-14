
import {
    MYWAREHOUSE,
    MYWAREHOUSE_BY_ID,
    IS_ERROR,
    IS_LOADING,
    CUSTOMERGSTLIST,
    VENDORGSTLIST

} from '../../types';

import {
    CUSTOMER_WAREHOUSE_URL
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


  export function myWarehouseList(data){
    return {
      type:MYWAREHOUSE,
      payload:data
    }
  }
  
  export function customergst(data){
    return {
      type:CUSTOMERGSTLIST,
      payload:data
    }
  }

  export function vendorgst(data){
    return {
      type:VENDORGSTLIST,
      payload:data
    }
  }

  export function myWarehouse_By_Id(data){
    return {
      type:MYWAREHOUSE_BY_ID,
      payload:data
  }
  }


// ###########  Fecth All Warehouse List ########

  export const myWarehouseByPage = (page) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let limit=10;
      try {
        axiosauth.get(CUSTOMER_WAREHOUSE_URL+`?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch( myWarehouseList(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("myWarehouse Fail")
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

  export const customerGstByPage = (page) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let limit=10;
      try {
        axiosauth.get(`/api/v1/booking/customer/allbookings?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch( customergst(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("myWarehouse Fail")
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

  export const vendorGstByPage = (page) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let limit=10;
      try {
        axiosauth.get(`/api/v1/booking/vendor/allbookings?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch( vendorgst(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("myWarehouse Fail")
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

export const myWarehouseById = (id) =>{
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.get(CUSTOMER_WAREHOUSE_URL+`/${id}`).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 200) { 
          dispatch(myWarehouse_By_Id(res.data))
          dispatch(isLoading(false))
      }
      else {
      console.log("myWarehouse Details Fail")
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



