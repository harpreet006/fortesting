
import {
    DOCUMENT,
    DOCUMENT_BY_ID,
    IS_ERROR,
    IS_LOADING,
} from '../../types';

import {
    DOCUMENT_URL
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


  export function documentList(data){
    return {
      type:DOCUMENT,
      payload:data
    }
  }

  export function document_By_Id(data){
    return {
      type:DOCUMENT_BY_ID,
      payload:data
  }
  }


// ###########  Fecth All Document List ########

  export const documentByPage = (page) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let limit=10;
      try {
        axiosauth.get(DOCUMENT_URL+`?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(documentList(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("document Fail")
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


  // ###########  Fecth All Booking List ########

  export const bookingByPage = (doctype) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.get(`/api/v1/booking/customer/allbookings?page=1&limit=10&doctype=${doctype}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(documentList(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("document Fail")
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


  // Fetch all Document list
  
  
  export const getAllDocument = (userType, page, docType) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.get(`/api/v1/booking/${userType}/allbookings?page=${page}&limit=10&doctype=${docType}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(documentList(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("document Fail")
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





    // ###########  Fecth All Booking List ########

    export const bookingVendorByPage = () =>{
      return async(dispatch) => {
        dispatch(isLoading(true))
        dispatch(isError(""))
        try {
          axiosauth.get(`/api/v1/booking/vendor/allbookings?page=1&limit=10`).then(response => {
          let res = JSON.parse(response.data)
          if (res.statusCode === 200) { 
              dispatch(documentList(res))
              dispatch(isLoading(false))
          }
          else {
          console.log("document Fail")
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



  // ###########  Fecth All Booking List new ########

  export const bookingByDocs = () =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.get(`/api/v1/booking/customer/mybooking?page=1&limit=10`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(documentList(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("document Fail")
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

    // ###########  Fecth Booking documents by id, usertype, doctype ########

    export const bookingByIdUserDocType = (id, userType,bookingDocId, docType) =>{
      return async(dispatch) => {
        dispatch(isLoading(true))
        dispatch(isError(""))
        try {
          axiosauth.get(`/api/v1/booking/${userType}/${id}/bookingdoc/${bookingDocId}/type/${docType}`).then(response => {
          let res = JSON.parse(response.data)
          if (res.statusCode === 200) { 
            dispatch(document_By_Id(res.data))
              dispatch(isLoading(false))
          }
          else {
          console.log("document Fail")
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


       // ###########  Fecth Booking documents by id, usertype, doctype ########

       export const customerSpaceCertificate = (id) =>{
        return async(dispatch) => {
          dispatch(isLoading(true))
          dispatch(isError(""))
          try {
            axiosauth.get(`/api/v1/booking/spacecertificate/${id}`).then(response => {
            let res = JSON.parse(response.data)
            if (res.statusCode === 200) { 
              dispatch(document_By_Id(res.data))
                dispatch(isLoading(false))
            }
            else {
            console.log("Space cetificate Fail")
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



// ###########  Fetch document By Id ############

export const documentById = (id) =>{
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.get(DOCUMENT_URL+`/${id}`).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 200) { 
          dispatch(document_By_Id(res.data))
          dispatch(isLoading(false))
      }
      else {
      console.log("document Details Fail")
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


// ###########  Fetch Warehouse By Id ############

export const documentByIdAndType = (id, type) =>{
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.get(`/api/v1/bookingdocument/customerdoc/${id}/type/${type}`).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 200) { 
          dispatch(document_By_Id(res.data))
          dispatch(isLoading(false))
      }
      else {
      console.log("document Details Fail")
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


