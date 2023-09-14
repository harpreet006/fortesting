
import {
    VENDOR_RFQ,
    VENDOR_BY_ID,
    RFQ_RESPONSE,
    IS_ERROR,
    IS_LOADING,
    IS_PENDING,
} from '../../types';

import {
    CREATE_VENDOR_RFQ_URL,
    GET_VENDOR_RFQ_URL
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


  export function rfqList(data){
    return {
      type:VENDOR_RFQ,
      payload:data
    }
  }

  export function rfq_By_Id(data){
    return {
      type:VENDOR_BY_ID,
      payload:data
  }
  }


  export function responseRfq(data){
    return {
      type:RFQ_RESPONSE,
      payload:data
  }
  }


// rfqByPage

// ===================================================


// ###########  Fecth All RFQList ########

  export const vendorRfqByPage = (page) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
    //   dispatch(rfqList(fetchAll))
      try {
        axiosauth.get(GET_VENDOR_RFQ_URL  + `?page=${page}&limit=${10}`).then(response => {
        let res = JSON.parse(response.data)
        console.log("rfq ressss===>", res)
        if (res.statusCode === 200) { 
            dispatch(rfqList(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Fail")
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



  
  // ###########  Fecth  RFQ Detail By Id ########

  export const vendorRfqById = (id) =>{
    return async(dispatch) => {
      dispatch(isError(""))
      // dispatch(rfq_By_Id(fetchById))
      try {
        axiosauth.get(GET_VENDOR_RFQ_URL+`/${id}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(rfq_By_Id(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Fail")
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


   // ###########  Fecth  RFQ Detail By Id ########

   export const vendorResponseRfqById = (id) =>{
    return async(dispatch) => {
      // dispatch(isLoading(true))
      console.log("Vendor--- by id")
      dispatch(isError(""))
      // dispatch(rfq_By_Id(fetchById))
      try {
        axiosauth.get(`/api/v1/vendorresponserfq/${id}`).then(response => {
        let res = JSON.parse(response.data)
        console.log("Resssss==============>", res)
        if (res.statusCode === 200) { 
            dispatch(rfq_By_Id(res))
            dispatch(isLoading(false))
        }
        else {
          dispatch(isLoading(false))
        console.log("rfq Fail")
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


    // ###########  Fecth  RFQ Detail By Id ########

    export const vendorRequestRfqById = (id) =>{
      return async(dispatch) => {
        dispatch(isLoading(true))
        dispatch(isError(""))
        // dispatch(rfq_By_Id(fetchById))
        try {
          axiosauth.get(`/api/v1/vendorrequestrfq/${id}`).then(response => {
          let res = JSON.parse(response.data)
          if (res.statusCode === 200) { 
              dispatch(rfq_By_Id(res))
              dispatch(isLoading(false))
          }
          else {
          console.log("rfq Fail")
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



      // ###########  Fecth  RFQ Detail By Id ########

      export const vendorRequestRfqByIdAndType = (id, type) =>{
        return async(dispatch) => {
          dispatch(isLoading(true))
          dispatch(isError(""))
          // dispatch(rfq_By_Id(fetchById))
          try {
            axiosauth.get(`/api/v1/vendorrequestrfq/${id}/type/${type}`).then(response => {
            let res = JSON.parse(response.data)
            if (res.statusCode === 200) { 
                dispatch(rfq_By_Id(res))
                dispatch(isLoading(false))
            }
            else {
            console.log("rfq Fail")
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


      // ###########  Fecth  RFQ Detail By Id ########

      export const vendorResponseRfqById1 = (id) =>{
        return async(dispatch) => {
          dispatch(isLoading(true))
          dispatch(isError(""))
          // dispatch(rfq_By_Id(fetchById))
          try {
            axiosauth.get(`/api/v1/vendorresponserfq/${id}`).then(response => {
            let res = JSON.parse(response.data)
            if (res.statusCode === 200) { 
                dispatch(rfq_By_Id(res))
                dispatch(isLoading(false))
            }
            else {
            console.log("rfq Fail")
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
  


// ###########  CREATE RFQ  ############

export const createVendorRFQ = (data, rfqId) =>{
    return async(dispatch) => {
      dispatch(isPending(true))
      dispatch(isError(""))
      try {
        axiosauth.post(CREATE_VENDOR_RFQ_URL + `/${rfqId}`, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200 || res.statusCode === 201) { 
            dispatch(responseRfq(res))
            dispatch(isPending(false))
        }
        else {
        console.log("rfq Details Fail")
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
  


