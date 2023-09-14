
import {
    INVOICE,
    INVOICE_BY_ID,
    INVOICE_RESPONSE,
    IS_ERROR,
    IS_LOADING,
} from '../../types';

import {
    INVOICE_URL
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


  export function invoiceList(data){
    return {
      type:INVOICE,
      payload:data
    }
  }

  export function invoice_By_Id(data){
    return {
      type:INVOICE_BY_ID,
      payload:data
  }
  }

  export function responseInvoice(data){
    return {
      type:INVOICE_RESPONSE,
      payload:data
    }
  }


// ###########  Fecth All Warehouse List ########

  export const invoiceByPage = (page) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let limit=10;
      try {
        axiosauth.get(INVOICE_URL+`?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
        console.log("invoice ressss===>", res)
        if (res.statusCode === 200) { 
            dispatch(invoiceList(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("invoice Fail")
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




// ###########  Fecth All Warehouse List ########

export const invoiceByuserType = (userTrype) =>{
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(invoiceList([]))
    dispatch(isError(""))
    try {
      axiosauth.get(`/api/v1/invoicemanagement?userType=${userTrype}&page=1&limit=10`).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 200) { 
          dispatch(invoiceList(res))
          dispatch(isLoading(false))
      }
      else {
      console.log("invoice Fail")
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



// ###########  Fecth All Warehouse List ########

export const userInvoice = (page, search) =>{
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(invoiceList([]))
    dispatch(isError(""))
    try {
      axiosauth.get(`/api/v1/invoicemanagement/customer?page=${page}&limit=10&search=${search}`).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 200) { 
          dispatch(invoiceList(res))
          dispatch(isLoading(false))
      }
      else {
      console.log("invoice Fail")
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


// ###########  Fecth All Warehouse List ########

export const invoiceonVendor = (page) =>{
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(invoiceList([]))
    dispatch(isError(""))
    try {
      axiosauth.get(`/api/v1/invoicemanagement/vendor?page=${page}&limit=10&search=`).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 200) { 
          dispatch(invoiceList(res))
          dispatch(isLoading(false))
      }
      else {
      console.log("invoice Fail")
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


// ###########  Fetch invoice By Id ############

export const invoiceById = (id) =>{
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.get(INVOICE_URL+`/${id}`).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 200) { 
          dispatch(invoice_By_Id(res.data))
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



    // ###########  UPDATE UPDATE_INVOICE_URL  ############
  
    export const createInvoice = (data) =>{
      return async(dispatch) => {
        dispatch(isError(""))
        try {
          axiosauth.post(INVOICE_URL, data).then(response => {
          let res = JSON.parse(response.data)
          if (res.statusCode === 200) { 
              dispatch(responseInvoice(res))
          }
          else {
          console.log("Invoice Details Fail")
          }
        }).catch((error) => {
            dispatch(isError(error.message))
        }).then(() => {
            console.log("-----always executes");
        })
      
      } catch(e) {
      }
      }
    }
