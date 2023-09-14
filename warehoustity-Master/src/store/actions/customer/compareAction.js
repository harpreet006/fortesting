
import {
    COMPARE,
    IS_ERROR,
    IS_LOADING
} from '../../types';

import {
    COMPARE_URL
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

  export function compareList(data){
    return {
      type:COMPARE,
      payload:data
    }
  }

  // #########################################
  // ########  Compare ###### 
  // #########################################

  export const getWarehouseCompare = (data) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      try {
        axiosauth.post(COMPARE_URL, data).then(response => {
        let res = JSON.parse(response.data)
        if (res.statusCode === 200) { 
          let newresp=res.data.reverse()

   //        if(newresp.length===2)
   //        {
   //       newresp.push( {
   //        "id":"",
   //        "warehouseName":"",
   //        "category":"",
   //        "type":"",
   //        "gstCertificate":"",
   //        "gstNumber":"",
   //        "location":"",
   //        "totalArea":"",
   //        "structureType":"",
   //        "workingHour":"",
   //        "pallet":"",
   //        "warehouseContactDetail":"",
   //        "whsWarehouseContactDetail":"",
   //        "whsFieldAgaintWarehouseContactDetail":"",
   //        "storageSpace":"",
   //        "whsStorageSpace":"",
   //        "whsFieldAgaintStorageSpace":"",
   //        "itAndOfficeInfra":"",
   //        "whsItAndOfficeInfra":"",
   //        "whsFieldAgaintItAndOfficeInfra":"",
   //        "mhInfra":"",
   //        "whsMhInfra":"",
   //        "whsFieldAgaintMhInfra":"",
   //        "safetyAndSecurity":"",
   //        "whsSafetyAndSecurity":"",
   //        "whsFieldAgaintSafetyAndSecurity":"",
   //        "permit":"",
   //        "whsPermit":"",
   //        "whsFieldAgaintPermit":"",
   //        "materialType":"",
   //        "whsMaterialType":"",
   //        "whsFieldAgaintMaterialType":"",
   //        "formEighty":"",
   //        "whsFormEighty":"",
   //        "whsFieldAgaintFormEighty":"",
   //        "warehouseImages":"",
   //        "whsWarehouseImages":"",
   //        "whsFieldAgaintWarehouseImages":"",
   //        "bookingStatus":"",
   //        "warehouseFormFilled":"",
   //        "vendorStatus":"",
   //        "adminStatus":"",
   //        "fieldAgaintStatus":"",
   //        "created_at":"2021-08-05T13:28:17.315Z",
   //        "updated_at":"2021-08-05T14:29:57.000Z",
   //        "storageSpaceInfo":{
   //           "id":1,
   //           "storageType":"floorarea",
   //           "totalArea":"",
   //           "noOfShift":"",
   //           "palletsOnFloor":"",
   //           "totalAvailableSpace":"",
   //           "loadingAndUnloadingBays":"",
   //           "parkingArea":"",
   //           "floors":[
   //              {
   //                 "id":1,
   //                 "floorType":"secondFloor",
   //                 "unit":"FEET",
   //                 "floorDimension":{
   //                    "id":1,
   //                    "dimension":"SQFT",
   //                    "length":"",
   //                    "breath":"",
   //                    "height":""
   //                 }
   //              },
   //              {
   //                 "id":2,
   //                 "floorType":"firstFloor",
   //                 "unit":"FEET",
   //                 "floorDimension":{
   //                    "id":2,
   //                    "dimension":"SQFT",
   //                    "length":"",
   //                    "breath":"",
   //                    "height":""
   //                 }
   //              },
   //              {
   //                 "id":3,
   //                 "floorType":"groundFloor",
   //                 "unit":"FEET",
   //                 "floorDimension":{
   //                    "id":3,
   //                    "dimension":"SQFT",
   //                    "length":"",
   //                    "breath":"",
   //                    "height":""
   //                 }
   //              },
   //              {
   //                 "id":4,
   //                 "floorType":"basement",
   //                 "unit":"FEET",
   //                 "floorDimension":{
   //                    "id":4,
   //                    "dimension":"SQFT",
   //                    "length":"",
   //                    "breath":"",
   //                    "height":""
   //                 }
   //              }
   //           ],
   //           "availableSpaces":[
                
   //           ]
   //        },
   //        "warehouseContactDetailInfo":{
   //           "id":1,
   //           "companyName":"companyName",
   //           "address":{
   //              "id":1,
   //              "line1":"",
   //              "line2":"",
   //              "city":"",
   //              "district":"",
   //              "state":"",
   //              "country":"",
   //              "pinCode":"",
   //              "landmark":"",
   //              "latitude":"",
   //              "longnitude":""
   //           }
   //        },
   //        "warehouseImagesInfo":{
   //          "id":1,
   //          "coverImage":{
   //             "id":1,
   //             "url":"/assets/images/logo.png",
   //             "type":"coverImage"
   //          },
   //          "indoorImages":[
   //             {
   //                "id":1,
   //                "url":"/assets/images/logo.png",
   //                "type":"indoor"
   //             }
   //          ],
   //          "outdoorImages":[
   //             {
   //                "id":1,
   //                "url":"/assets/images/logo.png",
   //                "type":"outdoor"
   //             }
   //          ]
   //       }
   //     },)
   //     newresp.push( {
   //      "id":"",
   //      "warehouseName":"",
   //      "category":"",
   //      "type":"",
   //      "gstCertificate":"",
   //      "gstNumber":"",
   //      "location":"",
   //      "totalArea":"",
   //      "structureType":"",
   //      "workingHour":"",
   //      "pallet":"",
   //      "warehouseContactDetail":"",
   //      "whsWarehouseContactDetail":"",
   //      "whsFieldAgaintWarehouseContactDetail":"",
   //      "storageSpace":"",
   //      "whsStorageSpace":"",
   //      "whsFieldAgaintStorageSpace":"",
   //      "itAndOfficeInfra":"",
   //      "whsItAndOfficeInfra":"",
   //      "whsFieldAgaintItAndOfficeInfra":"",
   //      "mhInfra":"",
   //      "whsMhInfra":"",
   //      "whsFieldAgaintMhInfra":"",
   //      "safetyAndSecurity":"",
   //      "whsSafetyAndSecurity":"",
   //      "whsFieldAgaintSafetyAndSecurity":"",
   //      "permit":"",
   //      "whsPermit":"",
   //      "whsFieldAgaintPermit":"",
   //      "materialType":"",
   //      "whsMaterialType":"",
   //      "whsFieldAgaintMaterialType":"",
   //      "formEighty":"",
   //      "whsFormEighty":"",
   //      "whsFieldAgaintFormEighty":"",
   //      "warehouseImages":"",
   //      "whsWarehouseImages":"",
   //      "whsFieldAgaintWarehouseImages":"",
   //      "bookingStatus":"",
   //      "warehouseFormFilled":"",
   //      "vendorStatus":"",
   //      "adminStatus":"",
   //      "fieldAgaintStatus":"",
   //      "created_at":"2021-08-05T13:28:17.315Z",
   //      "updated_at":"2021-08-05T14:29:57.000Z",
   //      "storageSpaceInfo":{
   //         "id":1,
   //         "storageType":"floorarea",
   //         "totalArea":"",
   //         "noOfShift":"",
   //         "palletsOnFloor":"",
   //         "totalAvailableSpace":"",
   //         "loadingAndUnloadingBays":"",
   //         "parkingArea":"",
   //         "floors":[
   //            {
   //               "id":1,
   //               "floorType":"secondFloor",
   //               "unit":"FEET",
   //               "floorDimension":{
   //                  "id":1,
   //                  "dimension":"SQFT",
   //                  "length":"",
   //                  "breath":"",
   //                  "height":""
   //               }
   //            },
   //            {
   //               "id":2,
   //               "floorType":"firstFloor",
   //               "unit":"FEET",
   //               "floorDimension":{
   //                  "id":2,
   //                  "dimension":"SQFT",
   //                  "length":"",
   //                  "breath":"",
   //                  "height":""
   //               }
   //            },
   //            {
   //               "id":3,
   //               "floorType":"groundFloor",
   //               "unit":"FEET",
   //               "floorDimension":{
   //                  "id":3,
   //                  "dimension":"SQFT",
   //                  "length":"",
   //                  "breath":"",
   //                  "height":""
   //               }
   //            },
   //            {
   //               "id":4,
   //               "floorType":"basement",
   //               "unit":"FEET",
   //               "floorDimension":{
   //                  "id":4,
   //                  "dimension":"SQFT",
   //                  "length":"",
   //                  "breath":"",
   //                  "height":""
   //               }
   //            }
   //         ],
   //         "availableSpaces":[
              
   //         ]
   //      },
   //      "warehouseContactDetailInfo":{
   //         "id":1,
   //         "companyName":"companyName",
   //         "address":{
   //            "id":1,
   //            "line1":"",
   //            "line2":"",
   //            "city":"",
   //            "district":"",
   //            "state":"",
   //            "country":"",
   //            "pinCode":"",
   //            "landmark":"",
   //            "latitude":"",
   //            "longnitude":""
   //         }
   //      },
   //      "warehouseImagesInfo":{
   //         "id":1,
   //         "coverImage":{
   //            "id":1,
   //            "url":"/assets/images/logo.png",
   //            "type":"coverImage"
   //         },
   //         "indoorImages":[
   //            {
   //               "id":1,
   //               "url":"/assets/images/logo.png",
   //               "type":"indoor"
   //            }
   //         ],
   //         "outdoorImages":[
   //            {
   //               "id":1,
   //               "url":"/assets/images/logo.png",
   //               "type":"outdoor"
   //            }
   //         ]
   //      }
   //   },)
   //        }

   //        if(newresp.length===3)
   //        {
   //       newresp.push( {
   //        "id":"",
   //        "warehouseName":"",
   //        "category":"",
   //        "type":"",
   //        "gstCertificate":"",
   //        "gstNumber":"",
   //        "location":"",
   //        "totalArea":"",
   //        "structureType":"",
   //        "workingHour":"",
   //        "pallet":"",
   //        "warehouseContactDetail":"",
   //        "whsWarehouseContactDetail":"",
   //        "whsFieldAgaintWarehouseContactDetail":"",
   //        "storageSpace":"",
   //        "whsStorageSpace":"",
   //        "whsFieldAgaintStorageSpace":"",
   //        "itAndOfficeInfra":"",
   //        "whsItAndOfficeInfra":"",
   //        "whsFieldAgaintItAndOfficeInfra":"",
   //        "mhInfra":"",
   //        "whsMhInfra":"",
   //        "whsFieldAgaintMhInfra":"",
   //        "safetyAndSecurity":"",
   //        "whsSafetyAndSecurity":"",
   //        "whsFieldAgaintSafetyAndSecurity":"",
   //        "permit":"",
   //        "whsPermit":"",
   //        "whsFieldAgaintPermit":"",
   //        "materialType":"",
   //        "whsMaterialType":"",
   //        "whsFieldAgaintMaterialType":"",
   //        "formEighty":"",
   //        "whsFormEighty":"",
   //        "whsFieldAgaintFormEighty":"",
   //        "warehouseImages":"",
   //        "whsWarehouseImages":"",
   //        "whsFieldAgaintWarehouseImages":"",
   //        "bookingStatus":"",
   //        "warehouseFormFilled":"",
   //        "vendorStatus":"",
   //        "adminStatus":"",
   //        "fieldAgaintStatus":"",
   //        "created_at":"2021-08-05T13:28:17.315Z",
   //        "updated_at":"2021-08-05T14:29:57.000Z",
   //        "storageSpaceInfo":{
   //           "id":1,
   //           "storageType":"floorarea",
   //           "totalArea":"",
   //           "noOfShift":"",
   //           "palletsOnFloor":"",
   //           "totalAvailableSpace":"",
   //           "loadingAndUnloadingBays":"",
   //           "parkingArea":"",
   //           "floors":[
   //              {
   //                 "id":1,
   //                 "floorType":"secondFloor",
   //                 "unit":"FEET",
   //                 "floorDimension":{
   //                    "id":1,
   //                    "dimension":"SQFT",
   //                    "length":"",
   //                    "breath":"",
   //                    "height":""
   //                 }
   //              },
   //              {
   //                 "id":2,
   //                 "floorType":"firstFloor",
   //                 "unit":"FEET",
   //                 "floorDimension":{
   //                    "id":2,
   //                    "dimension":"SQFT",
   //                    "length":"",
   //                    "breath":"",
   //                    "height":""
   //                 }
   //              },
   //              {
   //                 "id":3,
   //                 "floorType":"groundFloor",
   //                 "unit":"FEET",
   //                 "floorDimension":{
   //                    "id":3,
   //                    "dimension":"SQFT",
   //                    "length":"",
   //                    "breath":"",
   //                    "height":""
   //                 }
   //              },
   //              {
   //                 "id":4,
   //                 "floorType":"basement",
   //                 "unit":"FEET",
   //                 "floorDimension":{
   //                    "id":4,
   //                    "dimension":"SQFT",
   //                    "length":"",
   //                    "breath":"",
   //                    "height":""
   //                 }
   //              }
   //           ],
   //           "availableSpaces":[
                
   //           ]
   //        },
   //        "warehouseContactDetailInfo":{
   //           "id":1,
   //           "companyName":"companyName",
   //           "address":{
   //              "id":1,
   //              "line1":"",
   //              "line2":"",
   //              "city":"",
   //              "district":"",
   //              "state":"",
   //              "country":"",
   //              "pinCode":"",
   //              "landmark":"",
   //              "latitude":"",
   //              "longnitude":""
   //           }
   //        },
   //        "warehouseImagesInfo":{
   //          "id":1,
   //          "coverImage":{
   //             "id":1,
   //             "url":"/assets/images/logo.png",
   //             "type":"coverImage"
   //          },
   //          "indoorImages":[
   //             {
   //                "id":1,
   //                "url":"/assets/images/logo.png",
   //                "type":"indoor"
   //             }
   //          ],
   //          "outdoorImages":[
   //             {
   //                "id":1,
   //                "url":"/assets/images/logo.png",
   //                "type":"outdoor"
   //             }
   //          ]
   //       }
   //     },)
    
   //        }
            dispatch(compareList(newresp))
            dispatch(isLoading(false))
        }
        else {
        console.log("Compare Fail")
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
