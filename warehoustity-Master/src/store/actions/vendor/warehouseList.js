
import {
  WAREHOUSE_ERROR,
  WAREHOUSE_PENDING,
  WAREHOUSE_LOADING,
  ADD_NEW_WAREHOUSE,
  WAREHOUSE_LIST,
  WAREHOUSE_BY_ID,
  NEW_WAREHOUSE_INFO,
  ACCORDION,
  FINAL_SUBMIT,
  IMAGE_ID,
  WAREHOUSE_BY_ID_AND_TYPE,
  WAREHOUSE_ERROR_MSG,
} from '../../types';

import {
  ADD_WAREHOUSE,
  WAREHOUSE_LIST_URL,
  WAREHOUSE_BY_ID_URL,
  UPDATE_WAREHOUSE_URL,
  UPDATE_CONTACT_URL,
  UPDATE_MHINFRA_URL,
  UPDATE_OFFICE_SPACE_URL,
  UPDATE_IT_INFRA_SPACE_URL,
  UPDATE_MATERIAL_TYPE_URL,
  UPDATE_SAFETY_SECURITY,
  WAREHOUSE_IMAGES,
  FORM_EIGHTY_URL,
} from '../../../api/urls';

import axiosauth from '../../../api/axios-auth'

export function isPending(data) {
  return {
    type: WAREHOUSE_PENDING,
    payload: data,
  };
}

export function isLoading(data) {
  return {
    type: WAREHOUSE_LOADING,
    payload: data,
  };
}
export function imageid(data) {
  return {
    type: IMAGE_ID,
    payload: data,
  };
}

export function isError(data) {
  return {
    type: WAREHOUSE_ERROR,
    payload: data,
  };
}

export function isErrorMsg(data) {
  return {
    type: WAREHOUSE_ERROR_MSG,
    payload: data,
  };
}

export function accordian(data) {
  return {
    type: ACCORDION,
    payload: data,
  };
}

export function finalSubmitForm(data) {
  return {
    type: FINAL_SUBMIT,
    payload: data,
  };
}

export function addNewWarehouse(data) {
  return {
    type: ADD_NEW_WAREHOUSE,
    payload: data
  }
}

export function newWarehouseInfo(data) {
  return {
    type: NEW_WAREHOUSE_INFO,
    payload: data
  }
}

export function warehouseList(data) {
  return {
    type: WAREHOUSE_LIST,
    payload: data
  }
}

export function WarehouseById(data) {
  return {
    type: WAREHOUSE_BY_ID,
    payload: data
  }
}

export function WarehouseByIdType(data) {
  return {
    type: WAREHOUSE_BY_ID_AND_TYPE,
    payload: data
  }
}

export const changeWarehouseStatus = () => {
  return async (dispatch) => {
    dispatch(isPending(false))
    dispatch(addNewWarehouse([]))
    dispatch(isError(""))
    dispatch(newWarehouseInfo([]))
    dispatch(finalSubmitForm(false))
  }
}

// ###########  Fecth All Warehouse List ########

export const fetchWarehouse = () => {
  return async (dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.get(WAREHOUSE_LIST_URL).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {
          dispatch(warehouseList(res.data))
          dispatch(isLoading(false))
        }
        else {
          console.log("Add Warehouse Fail")
          dispatch(isPending(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isLoading(false))
      }).then(() => {
        dispatch(isLoading(false))
        console.log("-----always executes");
      })

    } catch (e) { }
  }
}

// ###########  Fecth All Warehouse List By Page Number ########

export const warehoseMap = (page) => {
  return async (dispatch) => {
    // const limit = 10;
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.post(WAREHOUSE_LIST_URL + `?page=${page}&limit=${100}`, {
        "filter": { user: JSON.parse(localStorage.getItem("userData")).id }
      }).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {
          dispatch(warehouseList(res))
          dispatch(isLoading(false))
        }
        else {
          console.log("Warehouse Fail==>", res)
          dispatch(isPending(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isLoading(false))
      }).then(() => {
        dispatch(isLoading(false))
        console.log("-----always executes");
      })

    } catch (e) {

    }

  }
}


// ###########  Fecth All Warehouse List By Page Number ########

export const fetchWarehouseByPage = (page, limit,filter={}) => {

  return async (dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {

      filter['user']=JSON.parse(localStorage.getItem("userData")).id


      axiosauth.get(`/api/v1/warehouses/mywarehouse` + `?page=${page ?? 1}&limit=${limit ?? 50}`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {
          dispatch(warehouseList(res))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
      }).then(() => {
        dispatch(isLoading(false))
      })

    } catch (e) { }
  }
}


export const fetchWarehouseByPageRejected = (page) => {
  return async (dispatch) => {
    const limit = 10;
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.post(WAREHOUSE_LIST_URL + `?page=${page}&limit=${limit}`, {
        "filter": {
          "type": "adminStatus", "status": "Resubmitted For Verification"
        }
      }).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {
          dispatch(warehouseList(res))
          dispatch(isLoading(false))
        }
        else {
          console.log("Warehouse Fail==>", res)
          dispatch(isPending(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isLoading(false))
      }).then(() => {
        dispatch(isLoading(false))
        console.log("-----always executes");
      })

    } catch (e) {

    }

  }
}

// ###########  Fetch Warehouse By Id ############

export const fetchWarehouseById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    try {
      axiosauth.get(WAREHOUSE_BY_ID_URL + `/${id}/type/warehouse/usertype/vendor`).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {
          dispatch(WarehouseById(res.data))
          dispatch(isLoading(false))
        }
        else {
          console.log("Warehouse Details Fail")
          dispatch(isPending(false))
        }
      }).catch((error) => {
        console.log("Fail--->", error.message)
        dispatch(isError(error.message))
        dispatch(isLoading(false))
      }).then(() => {
        dispatch(isLoading(false))
        console.log("-----always executes");
      })
    } catch (e) { }
  }
}




// ###########  Fetch Warehouse By Id And Type ############

export const fetchWarehouseByIdAndType = (id, type) => {
  return async (dispatch) => {
    dispatch(isLoading(true))
    dispatch(isError(""))
    dispatch(isErrorMsg(""))
    try {
      axiosauth.get(`/api/v1/warehouses/${id}/type/${type}/usertype/vendor`).then(response => {
        let res = JSON.parse(response.data)
        console.log("single data==>", res)
        if (res.statusCode === 200) {
          dispatch(WarehouseByIdType(res.data))
          dispatch(isLoading(false))
        }
        else {
          console.log("Warehouse Details Fail")
          dispatch(isErrorMsg(res.message))
          dispatch(isLoading(false))
        }
      }).catch((error) => {
        console.log("Fail--->", error.message)
        dispatch(isError(error.message))
        dispatch(isLoading(false))
      }).then(() => {
        dispatch(isLoading(false))
        console.log("-----always executes");
      })

    } catch (e) { }

  }
}



// ###########  Create New Warehouse ############

export const createNewWarehouse = (data) => {
  return async (dispatch) => {
    dispatch(isPending(true))
    dispatch(isError(""))
    dispatch(isErrorMsg(""))
    try {
      axiosauth.post(ADD_WAREHOUSE, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {
          dispatch(addNewWarehouse(res))
          dispatch(newWarehouseInfo(res))
          dispatch(fetchWarehouseById(res.data.id))
          dispatch(fetchWarehouseByIdAndType(res.data.id, "warehouseContactDetails"))
          dispatch(isPending(false))
          dispatch(accordian("contactForm"))
        }
        else {
          alert("Warehouse Already Exist")
          console.log("Add Warehouse Fail")
          dispatch(isErrorMsg(res.message))
          dispatch(isPending(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
        console.log("-----always executes");
      })

    } catch (e) {

    }
  }
}


// ###########  Update Warehouse ############

export const updateWarehouse = (id, data) => {
  return async (dispatch) => {
    dispatch(isPending(true))
    dispatch(isError(""))
    try {
      axiosauth.put(UPDATE_WAREHOUSE_URL + `/${id}`, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {

          dispatch(addNewWarehouse(res))
          dispatch(fetchWarehouseById(id))
          dispatch(fetchWarehouseByIdAndType(id, "warehouseContactDetails"))
          dispatch(isPending(false))
        }
        else {
          console.log("Add Warehouse Fail")
          dispatch(isErrorMsg(res.message))
          dispatch(isPending(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
        console.log("-----always executes");
      })

    } catch (e) {

    }
  }
}

// ###########  UPDATE WAREHOUSE CONTACT ############

export const updateWarehouseContact = (data) => {
  return async (dispatch) => {
    dispatch(isPending(true))
    dispatch(isError(""))
    dispatch(isErrorMsg(""))
    try {
      axiosauth.put(UPDATE_CONTACT_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201) {
          dispatch(addNewWarehouse(res))
          dispatch(isPending(false))
          dispatch(fetchWarehouseById(data.warehouse))
          dispatch(fetchWarehouseByIdAndType(data.warehouse, "warehouseContactDetails"))
          dispatch(accordian("spaceForm"))
        }
        else {
          console.log("Add Warehouse Fail==>", res)
          dispatch(isErrorMsg(res.message))
          dispatch(isPending(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
        console.log("-----always executes");
      })

    } catch (e) {

    }
  }
}

// ###########  UPDATE WAREHOUSE STORAGE ############

export const updateStorageSpace = (data) => {
  return async (dispatch) => {
    dispatch(isPending(true))
    dispatch(isError(""))
    dispatch(isErrorMsg(""))
    try {
      axiosauth.put(UPDATE_OFFICE_SPACE_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201) {
          dispatch(addNewWarehouse(res))
          dispatch(fetchWarehouseById(data.warehouse))
          dispatch(fetchWarehouseByIdAndType(data.warehouse, "storageSpace"))
          dispatch(isPending(false))
          dispatch(accordian("itOfficeForm"))
        }
        else {
          console.log("Add Warehouse Storage Fail==>", res)
          dispatch(isErrorMsg(res.message))
          dispatch(isPending(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
        console.log("-----always executes");
      })

    } catch (e) {

    }
  }
}


// ###########  UPDATE IT INFRA ############

export const updateItInfra = (itSpace) => {
  return async (dispatch) => {
    dispatch(isPending(true))
    dispatch(isError(""))
    dispatch(isErrorMsg(""))
    // it office infra Api class
    console.log("aaaaaa",itSpace);
    try {
      axiosauth.put(UPDATE_IT_INFRA_SPACE_URL, itSpace).then((response) => {
        
        let res = JSON.parse(response.data)
        
        if (res.statusCode === 201) {
          dispatch(addNewWarehouse(res))
          dispatch(isPending(false))
          dispatch(accordian("mhForm"))
          dispatch(fetchWarehouseById(itSpace.warehouse))
          dispatch(fetchWarehouseByIdAndType(itSpace.warehouse, "itInfrAndOfficeSpace"))
        }
        else {
          console.log("Add Warehouse Storage Fail==>", res)
          dispatch(isErrorMsg(res.message))
          dispatch(isPending(false))
        }
      }).catch((error) => {
        console.log("ddddddddddddd")
        dispatch(isError(error.message))
        dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
        console.log("-----always executes");
      })

    } catch (e) {

    }

  }
}


// ###########  UPDATE WAREHOUSE MH INFRA ############

export const updateMhInfra = (data) => {
  return async (dispatch) => {
    dispatch(isPending(true))
    dispatch(isError(""))
    dispatch(isErrorMsg(""))
    try {
      axiosauth.put(UPDATE_MHINFRA_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201) {
          dispatch(addNewWarehouse(res))
          dispatch(isPending(false))
          dispatch(fetchWarehouseById(data.warehouse))
          dispatch(fetchWarehouseByIdAndType(data.warehouse, "mhInfra"))
          dispatch(accordian("safetyForm"))
        }
        else {
          console.log("Add Warehouse MHINfra Fail==>", res)
          dispatch(isErrorMsg(res.message))
          dispatch(isPending(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
        console.log("-----always executes");
      })

    } catch (e) {

    }
  }
}

// ###########  UPDATE SAFETY SECURITY FORM ############

export const updateSafetySecurity = (data) => {
  return async (dispatch) => {
    dispatch(isPending(true))
    dispatch(isError(""))
    dispatch(isErrorMsg(""))
    try {
      axiosauth.put(UPDATE_SAFETY_SECURITY, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201) {
          dispatch(addNewWarehouse(res))
          dispatch(fetchWarehouseById(data.warehouse))
          dispatch(fetchWarehouseByIdAndType(data.warehouse, "safetyAndSecurity"))
          dispatch(isPending(false))
          dispatch(accordian("permitForm"))
        }
        else {
          console.log("Add Warehouse MHINfra Fail==>", res)
          dispatch(isErrorMsg(res.message))
          dispatch(isPending(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
        console.log("-----always executes");
      })

    } catch (e) {

    }
  }
}

// ###########  UPDATE PERMIN FORM ############

export const updatePermit = (permitData) => {
  return async (dispatch) => {
    dispatch(isPending(true))
    dispatch(isError(""))
    dispatch(isErrorMsg(""))
    try {
      axiosauth.put('/api/v1/buildingtraderelated', permitData).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201) {
          dispatch(addNewWarehouse(res))
          dispatch(fetchWarehouseById(permitData.warehouse))
          dispatch(fetchWarehouseByIdAndType(permitData.warehouse, "buildingTradeRelatedPermit"))
          dispatch(isPending(false))
          dispatch(accordian("materialForm"))
        }
        else {
          console.log("Add Warehouse MHINfra Fail==>", res)
          dispatch(isErrorMsg(res.message))
          dispatch(isPending(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
        console.log("-----always executes");
      })
    } catch (e) {
      console.log("--Try catch---", e);
    }
  }
}


// ###########  UPDATE MATERIAL TYPE FORM ############

export const updateMaterialType = (data) => {
  return async (dispatch) => {
    dispatch(isPending(true))
    dispatch(isError(""))
    dispatch(isErrorMsg(""))
    try {
      axiosauth.put(UPDATE_MATERIAL_TYPE_URL, data).then(response => {
        let res = JSON.parse(response.data)
        console.log("ressss---->", res)
        if (res.statusCode === 201) {
          dispatch(addNewWarehouse(res))
          dispatch(fetchWarehouseById(data.warehouse))
          dispatch(fetchWarehouseByIdAndType(data.warehouse, "materialType"))
          dispatch(isPending(false))
          // dispatch(accordian("photo"))
        }
        else {
          dispatch(isErrorMsg(res.message))
          dispatch(isPending(false))
          dispatch(accordian("photo"))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
        console.log("-----always executes");
      })

    } catch (e) {

    }
  }
}



// ###########  UPDATE IMAGES ############

export const updatePhoto = (data, id) => {
  return async (dispatch) => {
    console.log("photo===>", data)
    dispatch(isPending(true))
    dispatch(isError(""))
    dispatch(isErrorMsg(""))
    try {
      axiosauth.put(WAREHOUSE_IMAGES, data).then(response => {
        let res = JSON.parse(response.data)
        console.log("res===>", res)
        if (res.statusCode === 200) {
          dispatch(fetchWarehouseByIdAndType(id, "warehouseImages"))
          dispatch(fetchWarehouseById(id))
          dispatch(imageid(res.id))
          dispatch(isPending(false))
          // dispatch(accordian(""));
          dispatch(addNewWarehouse(res))

        }
        else {
          console.log("Add photo Fail==>", res)
          dispatch(isErrorMsg(res.message))
          dispatch(isPending(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
        console.log("-----always executes");
      })

    } catch (e) { }
  }
}



// ###########  UPDATE FORM EIGHTY ############

export const updateForm80 = (data) => {
  return async (dispatch) => {
    console.log("form80===>", data)
    dispatch(isPending(true))
    dispatch(isError(""))
    dispatch(isErrorMsg(""))
    try {
      axiosauth.put(FORM_EIGHTY_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 201) {
          dispatch(fetchWarehouseById(data.warehouse))
          dispatch(isPending(false))
          dispatch(accordian(""));
          dispatch(addNewWarehouse(res))
          dispatch(fetchWarehouseByIdAndType(data.warehouse, "formEighty"))

        }
        else {
          console.log("Add Warehouse 80 Fail==>", res)
          dispatch(isErrorMsg(res.message))
          dispatch(isPending(false))
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
        console.log("-----always executes");
      })

    } catch (e) { }
  }
}


// ###########  UPDATE WAREHOUSE STATUS ############

export const updateWarehouseStatus = (id, data) => {
  return async (dispatch) => {
    dispatch(isPending(true))
    dispatch(isError(""))
    try {
      axiosauth.put('/api/v1/warehouses/warehousefinalsubmit/' + id, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) {

          dispatch(addNewWarehouse(res))
          dispatch(fetchWarehouseById(id))
          dispatch(isPending(false))
          dispatch(finalSubmitForm(true));
          dispatch(addNewWarehouse(res))
        }
        else {
          console.log("Add Warehouse Fail")
        }
      }).catch((error) => {
        dispatch(isError(error.message))
        dispatch(isPending(false))
      }).then(() => {
        dispatch(isPending(false))
        console.log("-----always executes");
      })

    } catch (e) { }

  }
}