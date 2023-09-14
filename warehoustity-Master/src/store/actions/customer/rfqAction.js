
import {
    CUSTOMER_RFQ,
    CUSTOMERRFQ_BY_ID,
    RFQ_RESPONSE,
    RFQ_INITIAL_DETAIL,
    IS_ERROR,
    IS_LOADING,
    IS_PENDING,
    RFQ_FIRST_FORM,
} from '../../types';

import {
    GET_CUSTOMER_RFQ_URL,
    CREATE_CUSTOMER_RFQ_URL,
    UPDATE_RFQ_CONTACT_URL,
    UPDATE_RFQ_INBOUND_URL,
    UPDATE_RFQ_MANPOWER_URL,
    UPDATE_RETURN_RFQ_URL,
    UPDATE_INVENTOR_RFQ_URL,
    UPDATE_STORE_RFQ_URL,
    ADDED_VALUE_RFQ_URL,
    OTHER_SERVICE_RFQ_URL,
    UPDATE_GENERAL_URL,
    UPDATE_RFQ_OUTBOUND_URL,
    UPDATE_REQUIREMENT_URL,
    WHS_TO_CUSTOMER_RFQ,
    UPDATE_KPI_URL,
    CREATE_CUSTOMER_FINAL_RFQ_URL
  } from '../../../api/urls';

import axiosauth from '../../../api/axios-auth';

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
      type:CUSTOMER_RFQ,
      payload:data
    }
  }

  export function rfq_By_Id(data){
    console.log("rfqdata",data)
    return {
      type:CUSTOMERRFQ_BY_ID,
      payload:data
  }
  }

  export function rfq_Initial(data, type){
    return {
      type:RFQ_INITIAL_DETAIL,
      payload:{data, type}
  }
  }
  

  export function responseRfq(data){
    return {
      type:RFQ_RESPONSE,
      payload:data
  }
  }


// ###########  Fecth All RFQList ########

  export const rfqByPage = (page) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let limit=10
      try {
        axiosauth.get(CREATE_CUSTOMER_FINAL_RFQ_URL+`?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
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

  // Fetch Customer warehouse

  // ###########  Fecth All RFQList ########

  export const rfqCustomerAuth = (page) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let limit=10
      try {
        axiosauth.get(`/api/v1/customerrfq?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
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

  
  export const rfqCustomerAuthNoLoader = (page) =>{
    return async(dispatch) => {
      dispatch(isError(""))
      let limit=10
      try {
        axiosauth.get(`/api/v1/customerrfq?page=${page}&limit=${limit}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(rfqList(res))
        }
      }).catch((error) => {
          dispatch(isError(error.message))
      }).then(() => {
      })
    
    } catch(e) {}
    }
  }



  export const openRfqByPage = (rfqId) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.get(`/api/v1/vendorrequestrfq/admin/getopenrfq/customerrfq/${rfqId}`).then(response => {
        let res = JSON.parse(response.data)
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


  // ###########  customer RFQ By Id ############
export const initialRfqById = (id) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      try {
          axiosauth.get(CREATE_CUSTOMER_RFQ_URL+`/${id}`).then(response => {
          let res = JSON.parse(response.data)
          if (res.statusCode === 200) { 
              dispatch(rfq_Initial(res.data))
              dispatch(isLoading(false))
          }
          else {
          console.log("rfq Details Fail")
          }
        }).catch((error) => {
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



  // ###########  customer RFQ By Id and Type ############
  export const initialRfqByIdAndType = (id, type) =>{
    return async(dispatch) => {
      
      dispatch(isLoading(true))
      try {
          axiosauth.get(`/api/v1/customerrfq/${id}/type/${type}`).then(response => {
          let res = JSON.parse(response.data)
          if (res.statusCode === 200) {
            // console.log("itemmm",item)
            dispatch({
              type:RFQ_FIRST_FORM,
              payload:res.data

            })
              // dispatch(rfq_Initial(res.data, type))
              dispatch(isLoading(false))
          }
        }).catch((error) => {
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


  // ###########  customer RFQ By Id and Type ############
  export const viewRfqByIdAndType = (id, type) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      try {
          axiosauth.get(`/api/v1/customerrfq/${id}/type/${type}`).then(response => {
          let res = JSON.parse(response.data)
          if (res.statusCode === 200) {
              dispatch(rfq_By_Id(res.data))
              dispatch(isLoading(false))
          }
          else {
          console.log("rfq Details Fail")
          }
        }).catch((error) => {
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
  


// ###########  CREATE RFQ  ############

export const createRFQ = (data) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.post(CREATE_CUSTOMER_RFQ_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
            dispatch(responseRfq(res))
            dispatch(initialRfqByIdAndType(res.data.id, "customerRfq"))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Details Fail")
        }
      }).catch((error) => {
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


  
// ###########  CREATE RFQ  ############

export const updateRFQ = (id, data,item) =>{
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(isPending(true))
    dispatch(isError(""))
    try {
      axiosauth.put(`/api/v1/customerrfq/customerrfq/${id}`, data).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 200) { 
          dispatch(responseRfq(res))
          dispatch(isPending(false))
          dispatch(initialRfqByIdAndType(id, "customerRfq",item))
          dispatch(isLoading(false))
      }
    }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isLoading(false))
        dispatch(isPending(false))
    }).then(() => {
      dispatch(isLoading(false))
      dispatch(isPending(false))
        console.log("-----always executes");
    })
  
  } catch(e) {

  }
  }
}



// final submit
  export const finalRfq = (data, id, setFormSuccess) =>{
    return async(dispatch) => {
      try {
          axiosauth.put(`/api/v1/customerrfq/finalsubmit/${id}`, data).then(response => {
          let res = JSON.parse(response.data)
          if (res.statusCode === 308) { 
            dispatch(responseRfq(res))
            dispatch(isLoading(false))
            setFormSuccess(true)
          }
          else {
          console.log("rfq Details Fail")
          }
        }).catch((error) => {
            dispatch(isError(error.message))
            dispatch(isLoading(false))
        }).then(() => {
            console.log("-----always executes");
        })
      
      } catch(e) {
    
      }
    }
  }
  
  // ==============  Fake  Json  =========

  var fetchById ={
    "statusCode": 200,

    "data":
        {
            "id": 8,
            "totalPerUnitCost": 120000,
            "remark": "remark",
            "status": "",
            "manPowers": [
              {   
                "processType": "WH Manager",
                  "manpowerType": {
                      "name":"Shared"
                  },
                  "quantity": 12,
                  "costUnit": 39,
                  "totalMonth": 10,
                  "remark":"man remark"
              }, {   
                "processType": "Asst Manager",
                  "manpowerType": {
                      "name":"Dedicated"
                  },
                  "quantity": "34",
                  "costUnit": "23",
                  "totalMonth": "23",
                  "remark":"Remarks"
              }, {   
                "processType": "OB Executive+DEO",
                  "manpowerType": {
                      "name":"Dedicated"
                  },
                  "quantity": "",
                  "costUnit": "",
                  "totalMonth": "",
                  "remark":""
              }
              , {   
                "processType": "Dispatch Incharge",
                  "manpowerType": {
                      "name":"Dedicated"
                  },
                  "quantity": "",
                  "costUnit": "",
                  "totalMonth": "",
                  "remark":""
              }
              , {   
                "processType": "Inventory Incharge",
                  "manpowerType": {
                      "name":"Dedicated"
                  },
                  "quantity": "",
                  "costUnit": "",
                  "totalMonth": "",
                  "remark":""
              }
              , {   
                "processType": "Inventory Supervisor",
                  "manpowerType": {
                      "name":"Dedicated"
                  },
                  "quantity": "",
                  "costUnit": "",
                  "totalMonth": "",
                  "remark":""
              }
              , {   
                "processType": "Activity Supervisors",
                  "manpowerType": {
                      "name":"Dedicated"
                  },
                  "quantity": "",
                  "costUnit": "",
                  "totalMonth": "",
                  "remark":""
              }
              , {   
                "processType": "Labours",
                  "manpowerType": {
                      "name":"Dedicated"
                  },
                  "quantity": "",
                  "costUnit": "",
                  "totalMonth": "",
                  "remark":""
              }
              , {   
                "processType": "Security",
                  "manpowerType": {
                      "name":"Dedicated"
                  },
                  "quantity": "",
                  "costUnit": "",
                  "totalMonth": "",
                  "remark":""
              }
              , {   
                "processType": "House Keeping",
                  "manpowerType": {
                      "name":"Dedicated"
                  },
                  "quantity": "",
                  "costUnit": "",
                  "totalMonth": "",
                  "remark":""
              }
              
          ],
          "infrastructures": [
            {
                "processType": "MFD",
                "infrastructureType": {
                    "name":"Shared"
                },
                "quantity": 10,
                "costUnit": 10,
                "totalMonth": 20,
                "remark":"infra remark"
            },
            {
              "processType": "Fire Extinguiser",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Office Setup",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "HPT Electric Voltas",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Hand Pallet Truck",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Picking Trolley",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Desktop Computer",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Office Printer",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Printer With Xerox, Fax and Scan facility",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Barcode printer",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "UPS",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Inverter",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Electric Stacker",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "AC",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "ForkLift Battery Operated",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Projector",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Weighting Machine",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Wooden Pallets",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Generator 20KVA",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Message Boards (Notice)",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "HD Selves For File and Record",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Lock and Key Almira",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Water Cooler",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Labels & Signage",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Office and Security Fan",
            "infrastructureType": {
                "name":""
            },
            "quantity": "",
            "costUnit": "",
            "totalMonth": "",
            "remark":""
        }
        ,
            {
              "processType": "Emergency Light with Battery",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "WMS Software",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Wire Mesh Cage",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "First Aid Kit",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Security Alarm",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Dock Levler",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "Shelve Racks",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          }
          ,
            {
              "processType": "CCTV",
              "infrastructureType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Internal Painting",
            "infrastructureType": {
                "name":""
            },
            "quantity": "",
            "costUnit": "",
            "totalMonth": "",
            "remark":""
        },
        {
          "processType": "Security & Safety Audit",
          "infrastructureType": {
              "name":""
          },
          "quantity": "",
          "costUnit": "",
          "totalMonth": "",
          "remark":""
      },
      {
        "processType": "Security & Safety Displays",
        "infrastructureType": {
            "name":""
        },
        "quantity": "",
        "costUnit": "",
        "totalMonth": "",
        "remark":""
    },
    {
      "processType": "Shelved Rack",
      "infrastructureType": {
          "name":""
      },
      "quantity": "",
      "costUnit": "",
      "totalMonth": "",
      "remark":""
  },
  {
    "processType": "Broadband Connection setup",
    "infrastructureType": {
        "name":""
    },
    "quantity": "",
    "costUnit": "",
    "totalMonth": "",
    "remark":""
  }
  ,
  {
    "processType": "Vaccumm Cleaner",
    "infrastructureType": {
        "name":""
    },
    "quantity": "",
    "costUnit": "",
    "totalMonth": "",
    "remark":""
  }
  ,
  {
    "processType": "Start Up",
    "infrastructureType": {
        "name":""
    },
    "quantity": "",
    "costUnit": "",
    "totalMonth": "",
    "remark":""
  }
  ,
  {
    "processType": "Scanners",
    "infrastructureType": {
        "name":""
    },
    "quantity": "",
    "costUnit": "",
    "totalMonth": "",
    "remark":""
  }
        ],
        "runningCosts": [
          {
            "processType": "Rent",
              "runningCostType": {
                  "name":"Shared"
              },
              "quantity": 20,
              "costUnit": 3,
              "amount": 40,
              "totalMonth": 20,
              "remark":"run remark"
          },
          {
            "processType": "Infrastructure",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Manpower",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Communication",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Utilities",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Staff Welfare",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Power",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Licenses",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "House Keeping Consumables",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "WMS ID",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Packaging Consumable",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Genset",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Genset",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Consumable(printing material)",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Broadband Connection",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          },
          {
            "processType": "Pallets",
              "runningCostType": {
                  "name":""
              },
              "quantity": "",
              "costUnit": "",
              "amount": "",
              "totalMonth": "",
              "remark":""
          }
          
      ],
            "customerRfq": {
                    "id": 2,
                    "warehouseSpaceRequired": 500,
                    "location":{
                        "city": {
                            "name": "delhi"
                        },
                        "area": {
                            "name": "rohini"
                        }
                    },
                    "documentName":"Customer Rfq",
                    "sharedBy":"customer",
                    "sharedTo":"admin",
                    "purpose":"customer to warehousity",
                    "user": {
                        "id": 3,
                        "firstName": "customer",
                        "lastName": "customer",
                        "phone": "9870005432",
                        "companyName": "testcompany",
                        "referredCode": "",
                        "countryCode": "+91",
                        "email": "customer@customer.com",
                        "password": "$2b$10$GceRwo5Rfj9tBKvZXzzi8OIBRE4US6j.5e0zn8pecJj9JbhjD4/xK",
                        "userType": "consultant",
                        "roleId": 3,
                        "active": true,
                        "isPhoneVerified": true,
                        "phoneOtp": "3455",
                        "isEmailVerified": true,
                        "emailOtp": "1314"
                    },
                    "contactInformation": {
                        "companyName": "company",
                        "companyType": {
                            "type": "individual"
                        },
                        "address": "",
                        "registeredOfficeAddress":"",
                        "website": "http://website.com",
                        "groupCompany": "g-company",
                        "authorisedSignatory": "sign",
                        "annualTurnover": "1cr",
                        "noOfEmployees": 100,
                        "coreBusiness": "IT",
                        "certification": {
                            "name": "190-2001certificate"
                        },
                        "registration": {
                            "name": "msme license"
                        },
                        "contactPerson": "9876543210",
                        "title": "tilte",
                        "email": "test@test.com",
                        "phone": "909876543",
                        "customerRfq": 1
                    },
                    "general": {
                        "industrySector": {
                            "name": "retail"
                        },
                        "productType": {
                            "name": "general"
                        },
                        "warehouseCategory": {
                            "category": {
                            "name":"finish goods"  
                            },
                            "bounded": {
                                "name":"inFTWZ"
                            },
                            "other": "other"  
                        },
                        "dangerousGoods": "file",
                        "warehouseLocation": {
                            "cityAndArea": {
                                "name": "delhi"
                            },
                            "other": "other"
                        },
                        "workingHour": {
                            "startTime": 1, 
                            "endTime": 23, 
                            "week": "SUNDAY",
                            "other": "other"
                        },
                        "contractPeriod": {
                            "contract": {
                                "name": "1year"
                            },
                            "others": "other"  
                        },
                        "plannedGoLiveDate": "2021-04-01 07:37:05",
                        "customerRfq": 1
                    },
                    "inbounds": [
                        {
                            "processType": "pro typeupdate",
                            "uom": "uom",
                            "weightPerUom": "weightPerUom",
                            "volume": "DAILY",
                            "quantity": 10,
                            "vehicleType": "vehicleType",
                            "remark": "remark"
                        },
                        {
                            "processType": "pro typeupdate",
                            "uom": "uom",
                            "weightPerUom": "weightPerUom",
                            "volume": "DAILY",
                            "quantity": 10,
                            "vehicleType": "vehicleType",
                            "remark": "remark"
                        }
                    ],
                    "outbounds": [
                        {
                            "processType": "protype",
                            "uom": "uom",
                            "weightPerUom": "weightPerUom",
                            "volume": "DAILY",
                            "quantity": 10,
                            "vehicleType": "vehicleType",
                            "remark": "remark"
                        },
                        {
                            "processType": "pro type",
                            "uom": "uom",
                            "weightPerUom": "weightPerUom-upadted",
                            "volume": "DAILY",
                            "quantity": 80,
                            "vehicleType": "vehicleType",
                            "remark": "remark"
                        }
                    ],
                    "transferOrders":[
                        {
                            "processType": "transfer type",
                                        "uom": "uom",
                                        "weightPerUom": "weightPerUom-upadted",
                                        "volume": "DAILY",
                                        "quantity": 80,
                                        "vehicleType": "vehicleType",
                                        "remark": "remark",
                                        "salesOrdersType":[{
                                            "processType": "sales type",
                                            "uom": "uom",
                                            "weightPerUom": "weightPerUom-upadted",
                                            "volume": "DAILY",
                                            "quantity": 80,
                                            "vehicleType": "vehicleType",
                                            "remark": "remark"
                                        }]
                                    }
                    ],
                    "manPowers": [
                        {
                            "manPower": "WH Manager",
                            "quantity": 10,
                            "dedicatedSharedType": "SHARED",
                            "remark": "remark"
                        },
                        {
                            "manPower": "Asst Manager",
                            "quantity": 40,
                            "dedicatedSharedType": "DEDICATED",
                            "remark": "remark"
                        }
                    ],
                    "returnRfq": [
                        {
                            "processType": "protype",
                            "uom": "uom",
                            "weightPerUom": "weightPerUom",
                            "dailyWeekMonth": "WEEKLY",
                            "quantity": 10,
                            "remark": "remark"
                        },
                        {
                            "processType": "protype2",
                            "uom": "uom2",
                            "weightPerUom": "weightPerUom2",
                            "dailyWeekMonth": "WEEKLY",
                            "quantity": 90,
                            "remark": "remark"
                        }
                    ],
                    "inventoryManagements": [
                        {
                            "processType": "processType-up",
                            "yesNo": true,
                            "dailyWeekMonth": "WEEKLY",
                            "quantity": 60,
                            "remark": "remark"
                        },
                        {
                            "processType": "processType2-up",
                            "yesNo": false,
                            "dailyWeekMonth": "MONTHLY",
                            "quantity": 70,
                            "remark": "remark2"
                        }
                    ],
                    "storageTypes": [
                        {
                            "processType": "Temperature Control",
                            "temperatureRange": "200",
                            "noOfPallet": 100
                        },
                        {
                            "processType": "Dust Free",
                            "temperatureRange": "1000",
                            "noOfPallet": 800
                        },
                        {
                            "processType": "Humidity Control",
                            "temperatureRange": "400",
                            "noOfPallet": 200
                        }
                    ],
                    "valueAddedServices": [
                        {
                            "processType": "Quality Control",
                            "qtyPerMonth": 100,
                            "remark":  "remark"
                        },
                        {
                            "processType": "Repackaging",
                            "qtyPerMonth": 900,
                            "remark":  "remark2"
                        }
                    ],
                    "otherServiceRequirements": [
                        {
                            "descriptionType": "IT-up",
                            "noOfIds": "2",
                            "quantity": 200,
                            "remark": "remark-up"
                        },
                        {
                            "descriptionType": "WMS",
                            "noOfIds": "2",
                            "quantity": 100,
                            "remark": "remark"
                        }
                    ],
                    "warehouses": [
                        {
                            "id": 1,
                            "warehouseName": "wh1",
                            "category": "cold",
                            "type": "Dedicated",
                            "gstCertificate": "certifcate",
                            "gstNumber": "gst1234",
                            "location": "delhi",
                            "totalArea": 500,
                            "structureType": "shelter",
                            "workingHour": "9am-5pm",
                            "pallet": 10,
                            "status": "NEWREQUEST",
                            "warehouseContactDetail": true,
                            "storageSpace": true,
                            "itAndOfficeInfra": false,
                            "mhInfra": true,
                            "safetyAndSecurity": true,
                            "permit": false,
                            "materialType": false,
                            "formEighty": false,
                            "warehouseImages": false,
                            "created_at": "2021-05-26T11:12:40.105Z",
                            "updated_at": "2021-05-29T08:06:21.577Z",
                            "users": [
                                {
                                    "id": 8,
                                    "firstName": "vendor1",
                                    "lastName": "vendor1",
                                    "phone": "9870005432",
                                    "companyName": "testcompany",
                                    "referredCode": "",
                                    "countryCode": "+91",
                                    "email": "vendor1@vendor.com",
                                    "password": "$2b$10$nVgJk9pAPqYj5QUuOMS0YOsWlT/XS/7GYbXyPfh3MUXzDfVtkF5pK",
                                    "userType": "consultant",
                                    "roleId": 3,
                                    "active": true,
                                    "isPhoneVerified": false,
                                    "phoneOtp": "5199",
                                    "isEmailVerified": false,
                                    "emailOtp": "7676"
                                }
                            ]
                        },
                        {
                            "id": 5,
                            "warehouseName": "wh3",
                            "category": "cold",
                            "type": "shared",
                            "gstCertificate": "",
                            "gstNumber": "",
                            "location": "banglore",
                            "totalArea": 1500,
                            "structureType": "Shelter",
                            "workingHour": "9am-5pm",
                            "pallet": 30,
                            "status": "NEWREQUEST",
                            "warehouseContactDetail": false,
                            "storageSpace": false,
                            "itAndOfficeInfra": false,
                            "mhInfra": false,
                            "safetyAndSecurity": false,
                            "permit": false,
                            "materialType": false,
                            "formEighty": false,
                            "warehouseImages": false,
                            "created_at": "2021-05-28T07:57:20.115Z",
                            "updated_at": "2021-05-29T08:06:21.627Z",
                            "users": [
                                {
                                    "id": 9,
                                    "firstName": "vendor2",
                                    "lastName": "vendor2",
                                    "phone": "9870005432",
                                    "companyName": "testcompany",
                                    "referredCode": "",
                                    "countryCode": "+91",
                                    "email": "vendor2@vendor.com",
                                    "password": "$2b$10$wPOFZMJ8/4olpvplwNiEbO.TD2fvwMXd29AvhgHoO5o5hfNHCYmB6",
                                    "userType": "consultant",
                                    "roleId": 3,
                                    "active": true,
                                    "isPhoneVerified": false,
                                    "phoneOtp": "2380",
                                    "isEmailVerified": false,
                                    "emailOtp": "7400"
                                }
                            ]
                        }
                    ],
                    "kpi":{
                        "kpi":"http://www.file.com"
                    },
                    "additionalRequirement": {
                        "additionalRequirement": "string`"
                    },
                    "created_at":"date"
                },
            "vendorResponseRfq": {
                "id": 7,
                "totalPerUnitCost": 800000,
                "remark": "remark",
                "status": "",
                "manPowers": [
                    {
                        "id": 4,
                        "quantity": 12,
                        "costUnit": "39",
                        "totalMonth": "10",
                        "remark": "man remark"
                    }
                ],
                "infrastructures": [
                    {
                        "id": 4,
                        "quantity": 10,
                        "costUnit": "10",
                        "totalMonth": "20",
                        "remark": "infra remark"
                    }
                ],
                "runningCosts": [
                    {
                        "id": 4,
                        "quantity": 20,
                        "costUnit": "3",
                        "totalMonth": "20",
                        "remark": "run remark"
                    }
                ],
                "customerRfq": []
            }
        }

        //hello

    // "data":{
    //         "id": 0,
    //         "status": "Confirm",
    //         "locationDetails": [
    //             {
    //                 "id": 1,
    //                 "type": "location2",
    //                 "input": "impu2",
    //                 "remark": "remark2"
    //             },
    //             {
    //                 "id": 2,
    //                 "type": "location",
    //                 "input": "input",
    //                 "remark": "remark"
    //             }
    //         ],
    //         "manPowers": [
    //             {
    //                 "id": 1,
    //                 "manpowerType": "manpower",
    //                 "quantity": 42,
    //                 "costUnit": 39,
    //                 "totalMonth": 10
    //             },
    //             {
    //                 "id": 2,
    //                 "manpowerType": "manpower",
    //                 "quantity": 12,
    //                 "costUnit": 39,
    //                 "totalMonth": 10
    //             }
    //         ],
    //         "infrastructures": [
    //             {
    //                 "id": 1,
    //                 "infrastructureType": "infra",
    //                 "quantity": 10,
    //                 "costUnit": 10,
    //                 "totalMonth": 20,
    //                 "yearDeap": "year deap",
    //                 "dep": "dep",
    //                 "int": "int",
    //                 "amc": "amc"
    //             }
    //         ],
    //         "runningCosts": [
    //             {
    //                 "id": 1,
    //                 "runningCostType": "runningCosts",
    //                 "quantity": 20,
    //                 "costUnit": 3,
    //                 "amount": 40
    //             }
    //         ],
    //         "monthlyCosts": [
    //             {
    //                 "id": 1,
    //                 "monthlyCostType": "mct",
    //                 "year": "2021-21-01"
    //             }
    //         ],
    //         "customerRfq": {
    //             "id": 1,
    //             "kpi": "kpi details",
    //             "additionalRequirements": "additional info reqirement",
    //             "warehouseSpaceRequired": 100,
    //             "status": "",
    //             "location":{
    //               "city":"Noida",
    //               "area" : "sector 63",
    //           },
    //             "created_at":"2021-06-04T07:00:09.770Z",
    //             "contactInformation": {
    //               "companyName": "company",
    //               "companyType": {
    //                   "type": "individual"
    //               },
    //               "address": "",
    //               "registeredOfficeAddress":"",
    //               "website": "http://website.com",
    //               "groupCompany": "g-company",
    //               "authorisedSignatory": "sign",
    //               "annualTurnover": "1cr",
    //               "noOfEmployees": 100,
    //               "coreBusiness": "IT",
    //               "certification": {
    //                   "name": "190-2001certificate"
    //               },
    //               "registration": {
    //                   "name": "msme license"
    //               },
    //               "contactPerson": "9876543210",
    //               "title": "tilte",
    //               "email": "test@test.com",
    //               "phone": "909876543",
    //               "customerRfq": 1
    //           }
    //         }
    //     }
  }
 

// ###########  customer RFQ By Id ############

export const customerRfqById = (id) =>{
  return async(dispatch) => {

    // dispatch(rfq_By_Id(customerbyId))

    try {
        axiosauth.get(CREATE_CUSTOMER_RFQ_URL+`/${id}`).then(response => {
        let res = JSON.parse(response.data)
        console.log("resss--->", res)
        if (res.statusCode === 200) { 
            dispatch(rfq_By_Id(res.data))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Details Fail")
        }
      }).catch((error) => {
          dispatch(isError(error.message))
          dispatch(isLoading(false))
      }).then(() => {
          console.log("-----always executes");
      })
    
    } catch(e) {
  
    }
  }
}


// ###########  Fetch RFQ By Id ############

export const rfqById = (id) =>{
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.get(GET_CUSTOMER_RFQ_URL+`/${id}`).then(response => {
      let res = JSON.parse(response.data)
      console.log("resss--->", res)
      if (res.statusCode === 200) { 
          dispatch(rfq_By_Id(res.data))
          dispatch(isLoading(false))
      }
      else {
        dispatch(isLoading(false))
      console.log("rfq Details Fail")
      }
    }).catch((error) => {
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
 


// ###########  Fetch RFQ By Id ############

export const whsRfqById = (id) =>{
  return async(dispatch) => {

    dispatch(rfq_By_Id(fetchById))
   
  }
}



 // ###########  Fecth  Warehouse to customer rfq By Id ########

 export const whsToCustomerRfqById = (id) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
    // dispatch(rfq_By_Id(fetchById))
      dispatch(isError(""))
      try {
        axiosauth.get(WHS_TO_CUSTOMER_RFQ+`/${id}`).then(response => {
        let res = JSON.parse(response.data)
        console.log("Res--->", res)
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



// ###########  Fetch RFQ By Id ############

export const statusRfqById = (id) =>{
  console.log("hey",id)
  alert("hello")
  return async(dispatch) => {

    // dispatch(rfq_By_Id(byId))
    dispatch(isLoading(true))

    try {
      axiosauth.get(`/api/v1/customerrfq/${id}/type/customerRfq`).then(response => {
      let res = JSON.parse(response.data)
      console.log("ress",res)
      if (res.statusCode === 201) { 
        console.log("sss",res.data)
          dispatch(rfq_By_Id(res.data))
          console.log("aaa",res.data)
          dispatch(isLoading(false))
          
      }
      else {
      console.log("rfq Details Fail")
      }
    }).catch((error) => {
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


// ###########  Fetch RFQ By Id ############

export const statusRfqByIdWarehouseId = (rfqId, warehouseId) =>{
  // return async(dispatch) => {

  //   dispatch(isLoading(true))

  //   try {
  //     axiosauth.get(`/api/v1/customerrfq/${rfqId}/warehouse/${warehouseId}`).then(response => {
  //     let res = JSON.parse(response.data)
  //     if (res.statusCode === 200) { 
  //         dispatch(rfq_By_Id(res.data))
  //         dispatch(isLoading(false))
  //     }
  //     else {
  //     console.log("rfq Details Fail")
  //     }
  //   }).catch((error) => {
  //       dispatch(isError(error.message))
  //       dispatch(isLoading(false))
  //   }).then(() => {
  //     dispatch(isLoading(false))
  //       console.log("-----always executes");
  //   })
  
  // } catch(e) {
  // }
  // }
}



// ###########  UPDATE_RFQ_CONTACT  ############

export const updateContactRFQ = (data,item) =>{
  
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.put(UPDATE_RFQ_CONTACT_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201 || res.statusCode === 200) { 
          console.log("kkkk",item)
          dispatch(responseRfq(res))
          dispatch(initialRfqByIdAndType(data.customerRfq, "contactInformation",item))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Details Fail")
        
        }
      }).catch((error) => {
        console.log("Error===>", error)
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


  // ###########  UPDATE_GENERAL  ############

export const updateGeneralRFQ = (data,item) =>{
  console.log("general",data.customerRfq)
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.put(UPDATE_GENERAL_URL, data).then(response => {
      let res = JSON.parse(response.data)
      console.log("lllll",data)
      if (res.statusCode === 201 || res.statusCode === 200) { 
        dispatch(responseRfq(res))
        dispatch(initialRfqByIdAndType(data.customerRfq, "general",item))
          dispatch(isLoading(false))
      }
    }).catch((error) => {
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



  

  // ###########  UPDATE_RFQ_INBOUND  ############

export const updateInboundRFQ = (data,item) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.put(UPDATE_RFQ_INBOUND_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201 || res.statusCode === 200) { 
            dispatch(initialRfqByIdAndType(data.customerRfq, "inbounds",item))
            dispatch(responseRfq(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Details Fail")
        }
      }).catch((error) => {
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



    // ###########  UPDATE_RFQ_OUTBOUND  ############

export const updateOutboundRFQ = (data,item) =>{
  return async(dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.put(UPDATE_RFQ_OUTBOUND_URL, data).then(response => {
      let res = JSON.parse(response.data)
      if (res.statusCode === 201 || res.statusCode === 200) {
          dispatch(initialRfqByIdAndType(data.customerRfq, "outbounds",item))
          dispatch(responseRfq(res))
          dispatch(isLoading(false))
      }
      else {
      console.log("rfq Details Fail")
      }
    }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isLoading(false))
    }).then(() => {
      dispatch(isLoading(false))
        console.log("-----always executes");
    })
  } catch(e) { }

  }
}


   // ###########  UPDATE_RFQ_MANPOWER  ############

export const updateManpowerRFQ = (data) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.put(UPDATE_RFQ_MANPOWER_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201 || res.statusCode === 200) { 
          dispatch(initialRfqByIdAndType(data.customerRfq, "manPowers"))
            dispatch(responseRfq(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Details Fail")
        }
      }).catch((error) => {
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

  // ###########  UPDATE_RETURN_RFQ  ############

  export const updateReturnRFQ = (data) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.put(UPDATE_RETURN_RFQ_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201 || res.statusCode === 200) { 
            dispatch(initialRfqByIdAndType(data.customerRfq, "returnRfq"))
            dispatch(responseRfq(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Details Fail")
        }
      }).catch((error) => {
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

  // ###########  UPDATE_INVENTOR_RFQ  ############

  export const updateInventorRFQ = (data,item) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.put(UPDATE_INVENTOR_RFQ_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201 || res.statusCode === 200) { 
            dispatch(initialRfqByIdAndType(data.customerRfq, "inventoryManagements",item))
            dispatch(responseRfq(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Details Fail")
        }
      }).catch((error) => {
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



  // ###########  UPDATE_STORE_RFQ_URL  ############

  export const updateStoreRFQ = (data,item) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.put(UPDATE_STORE_RFQ_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201 || res.statusCode === 200) { 
          dispatch(initialRfqByIdAndType(data.customerRfq, "storageTypes",item))
            dispatch(responseRfq(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Details Fail")
        }
      }).catch((error) => {
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

  // ###########  ADDED_VALUE_RFQ  ############

  export const updateAddedRFQ = (data) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.put(ADDED_VALUE_RFQ_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201 || res.statusCode === 200) { 
          dispatch(initialRfqByIdAndType(data.customerRfq, "valueAddedServices"))
            dispatch(responseRfq(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Details Fail")
        }
      }).catch((error) => {
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

  // ###########  OTHER_SERVICE_RFQ_URL  ############

  export const updateOtherServiceRFQ = (data,item) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.put(OTHER_SERVICE_RFQ_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201 || res.statusCode === 200) { 
          dispatch(initialRfqByIdAndType(data.customerRfq, "otherServiceRequirements",item))
            dispatch(responseRfq(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Details Fail")
        }
      }).catch((error) => {
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


   // ###########  UPDATE KPI   ############

   export const updateKpiRFQ = (data,item) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.put(UPDATE_KPI_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201 || res.statusCode === 200) { 
          dispatch(initialRfqByIdAndType(data.customerRfq, "kpi",item))
            dispatch(responseRfq(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Details Fail")
        }
      }).catch((error) => {
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





   // ###########  OTHER_SERVICE_RFQ_URL  ############

   export const updateRequirementRFQ = (data,item) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.put(UPDATE_REQUIREMENT_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201 || res.statusCode === 200) { 
          dispatch(initialRfqByIdAndType(data.customerRfq, "additionalRequirement",item))
            dispatch(responseRfq(res))
            dispatch(isLoading(false))
        }
        else {
        console.log("rfq Details Fail")
        }
      }).catch((error) => {
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