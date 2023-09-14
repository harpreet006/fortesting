import axiosauth from '../api/axios-auth';

import {DOCUMET_UPLOAD_URL, UPLOAD_CERTIFICATE_URL} from '../api/urls'

export const uploadWarehouseCertificate = async (data) =>{
      try {
      const response = await axiosauth.post(UPLOAD_CERTIFICATE_URL, data)
        let res = JSON.parse(response.data)
        if (res.statusCode === 201 || res.statusCode === 200) { 
            return {url: res.data.url, success:true}
        }
        else {
            return {url: "", success:false}
        }
    
    } catch(e) {
      return {url: "", success:false}
    }
  }


  export const documentUpload = async (data) =>{
    try {
    const response = await axiosauth.post(DOCUMET_UPLOAD_URL, data)
      let res = JSON.parse(response.data)
      if (res.statusCode === 201 || res.statusCode === 200) { 
          return {url: res.data, success:true}
      }
      else {
          return {url: "", success:false}
      }
  
  } catch(e) {
    return {url: "", success:false}
  }
}



export const documentUploadV2 = async (data) =>{
  return new Promise (async(resolve,reject) => {
    try {
      const response = await axiosauth.post(DOCUMET_UPLOAD_URL, data)
        let res = JSON.parse(response.data)
        if (res.statusCode === 201 || res.statusCode === 200) { 
            resolve( {url: res.data, success:true})
        }
        else {
            reject( {url: res.data, success:true})
        }
    
    } catch(e) {
      reject(e.message)
    }
  })

}


export const getWarehouseListByFilter = (filter, warehouses) =>{

/* 
filter: {
  "state":[],
  "city":[],
  "warehouseType":[],
  "warehouseCategory":[],
  "cfa":[],
}
*/

const updateWarehouseList = []
console.log('warehouse-selected- - ',warehouses)
warehouses = warehouses.map(warehouse=>{
  let bool = true
  
  if(filter && filter.state && filter.state.length>0 && filter.state!=='ALL' &&!filter.state.includes(warehouse.warehouseContactDetailInfo.address.state.toUpperCase())){
    console.log('warehouse-selected-state - ',warehouse)

    bool=false
  }
  if(filter && filter.city && filter.city.length>0&& filter.city!=='ALL' && !filter.city.includes(warehouse.warehouseContactDetailInfo.address.district.toUpperCase())){
    console.log('warehouse-selected-city - ',warehouse)
  
    bool=false
  }
  if(filter && filter.warehouseType && filter.warehouseType.length>0 && filter.warehouseType!=='ALL' && !filter.warehouseType.includes(warehouse.type.type.toUpperCase())){
    console.log('warehouse-selected-type - ',warehouse)
  
    bool=false
  }
  if(filter && filter.warehouseCategory && filter.warehouseCategory.length>0 && filter.warehouseCategory!=='ALL'&& !filter.warehouseCategory.includes(warehouse.category.categoryName.toUpperCase())){
    console.log('warehouse-selected-category - ',warehouse)
  
    bool=false
  }
  if (bool){
    updateWarehouseList.push(warehouse)
  }
    return warehouse
})

return updateWarehouseList;


}