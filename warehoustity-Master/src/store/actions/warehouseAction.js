import {
  WAREHOUSE_LIST,
  WAREHOUSE_BY_ID,
  WAREHOUSEFILTER,
  WAREHOUSE_FETURE,
  WAREHOUSE_SUGGEST,
  EXPLORE_NETWORK,
  IS_ERROR,
  IS_LOADING,
  GEOCORDINATE,
  WAREHOUSE_DETAIL_PAGE,
  
} from "../types";

import { WAREHOUSE_LIST_URL, WAREHOUSE_BY_ID_URL } from "../../api/urls";

import axiosauth from "../../api/axios-auth";

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

export function warehouseList(data) {
  return {
    type: WAREHOUSE_LIST,
    payload: data,
  };
}

export function fetureList(data) {
  return {
    type: WAREHOUSE_FETURE,
    payload: data,
  };
}

export function suggestList(data) {
  return {
    type: WAREHOUSE_SUGGEST,
    payload: data,
  };
}

export function warehouseDetailPage(data) {
  return {
    type: WAREHOUSE_DETAIL_PAGE,
    payload: data,
  };
}
export function geoList(data) {
  return {
    type: GEOCORDINATE,
    payload: data,
  };
}
export function warehousefilter(data) {
  return {
    type: WAREHOUSEFILTER,
    payload: data,
  };
}
export function WarehouseById(data) {
  return {
    type: WAREHOUSE_BY_ID,
    payload: data,
  };
}

// Filter on dashboard

export const dashboardFilter = () => {
  return async (dispatch) => {
    try {
      axiosauth
        .get(WAREHOUSE_LIST_URL)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(warehouseList(res.data));
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// ###########  Fetch Mapped Warehouse By User Id ###############
// /user/:userId

export const fetchMappedWarehouse = (setMappedWarehouse) => {
  return async (dispatch) => {
    let user = localStorage.getItem("userData");
    user = JSON.parse(user);
    if(user){
      axiosauth
      .get(`/api/v1/warehousemap/user/${user.id}`)
      .then((response) => {
        let res = JSON.parse(response.data);
        if (res.statusCode === 200) {
          setMappedWarehouse(res.data)
        }
      })
      .catch((error) => {
        console.log("error->", error);
      });
    }
  };
};

export const fetchWarehouseById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get("/api/v1/warehouses/warehousedetailpage/" + id)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(warehouseDetailPage(res.data));
            dispatch(isLoading(false));
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ###########  Fecth All Warehouse List ########

export const allWarehouse = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(WAREHOUSE_LIST_URL)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(warehouseList(res.data));
            dispatch(isLoading(false));
          } else {
            console.log("Add Warehouse Fail");
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ###########  Fecth All Warehouse List By Page Number ########

export const warehouseByPage = (page, filter, pageLimit = null) => {
  return async (dispatch) => {
    const limit = pageLimit || 10;
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .post(WAREHOUSE_LIST_URL + `?page=${page}&limit=${limit}`, filter)
        .then((response) => {
          let res = JSON.parse(response.data);

          if (res.statusCode === 200) {
            let data = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].warehouseContactDetailInfo !== null) {
                data.push({
                  lat: parseFloat(
                    res.data[i].warehouseContactDetailInfo.address.latitude
                  ),
                  lng: parseFloat(
                    res.data[i].warehouseContactDetailInfo.address.longnitude
                  ),
                  id: res.data[i].id,
                  warehouseId: res.data[i].warehouseId,
                  category: res.data[i].category,
                  type: res.data[i].type,
                  location:
                    res.data[i] &&
                    res.data[i].warehouseContactDetailInfo &&
                    res.data[i].warehouseContactDetailInfo.address.city,
                  image: res.data[i]?.warehouseImagesInfo?.coverImage?.url,
                  totalArea:
                    res.data[i] &&
                    res.data[i].storageSpaceInfo &&
                    res.data[i].storageSpaceInfo.totalArea,
                });
              }
            }
            dispatch(geoList(data));
            dispatch(warehouseList(res));
            dispatch(isLoading(false));
          } else {
            console.log("Warehouse Fail==>", res);
          }
        })
        .catch((error) => {
          console.log("fjjfdjdf", error);
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

export const warehouseFilterByType = (page, filter) => {
  return async (dispatch) => {
    const limit = 10;
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .post(
          `/api/v1/warehouses/filterwarehouse?page=${page}&limit=${limit}`,
          filter
        )
        .then((response) => {
          let res = JSON.parse(response.data);

          if (res.statusCode === 200) {
            dispatch(warehouseList(res));
            dispatch(isLoading(false));
          } else {
            console.log("Warehouse Fail==>", res);
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

export const warehouseByfilter = (page, filter) => {
  return async (dispatch) => {
    const limit = 10;
    dispatch(isLoading(true));
    dispatch(isError(""));
    dispatch(warehouseList([]));
    try {
      axiosauth
        .post(
          `/api/v1/filter/fetchfilterdata?page=${page}&limit=${limit}`,
          filter
        )
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("vvvvvvvvvvvv",res.data)

          if (res.statusCode === 200) {
            dispatch(
              warehouseList({ data: res.data[0].filterOptions[0].warehouses })
              
            );
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};
export const filterofwarehouse = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(`/api/v1/filter`)
        .then((response) => {
          let res = JSON.parse(response.data);

          if (res.statusCode === 200) {
            dispatch(warehousefilter(res.data));
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// Search warehouse
// ###########  Fecth All Warehouse By Search ########

export const searchWarehouse = (data, pageCount) => {
  console.log("status",data)
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .post(`/api/v1/filter/advancedfilter?page=${pageCount}&limit=10`, {
          filter: data,
        })
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("rihannd", res.data.warehouses);
          console.log("status2",data)
          let newwh = [];
          for (let i = 0; i < res.data.warehouses.length; i++) {
            newwh.push(res.data.warehouses[i]);
          }
          if (res.statusCode === 200) {
            dispatch(
              warehouseList({
                page: res.page,
                totalCount: res.totalCount,
                data: newwh,
              })
            );
            dispatch(isLoading(false));
          } else {
            console.log("Warehouse Fail==>", res);
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ###########  Fecth All Warehouse By Search ########

export const getWarehouseByCity = (data) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .post(`/api/v1/warehouses/city`, data)
        .then((response) => {
          let res = JSON.parse(response.data);

          if (res.statusCode === 200) {
            dispatch(warehouseList(res.data));
            dispatch(isLoading(false));
          } else {
            console.log("Warehouse Fail==>", res);
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// export const save = ()=>{

//   return{
//   type: SAVEVALUE,
//   payload: false,
//   }
  

// }

// ###########  Fetch Warehouse By Id ############

export const warehouseById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(WAREHOUSE_BY_ID_URL + `/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(WarehouseById(res.data));
            dispatch(isLoading(false));
          } else {
            console.log("Warehouse Details Fail");
          }
        })
        .catch((error) => {
          console.log("Fail--->", error.message);
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ###################################
// Features Warehoue
// ##################################

export const FeaturesWarehouse = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    // /api/v1/warehouses/featured/warehouse?page=1&limit=10
    try {
      axiosauth
        .get(`/api/v1/featuredwarehouse/live`)
        .then((response) => {
          let res = JSON.parse(response.data);

          if (res.statusCode === 200) {
            dispatch(fetureList(res.data));
            dispatch(isLoading(false));
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// #############################
// Suggest for you
// #############################

export const suggestForYouWarehouse = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(`/api/v1/warehouses/suggested/warehouse?page=${1}&limit=${10}`)
        .then((response) => {
          let res = JSON.parse(response.data);

          if (res.statusCode === 200) {
            dispatch(suggestList(res.data));
            dispatch(isLoading(false));
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// Explore network

export const exploreNetwork = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(`/api/v1/warehouses/explore/network`)
        .then((response) => {
          let res = JSON.parse(response.data);

          if (res.statusCode === 200) {
            console.log("Explore Network ==>", res);
            dispatch({
              type: EXPLORE_NETWORK,
              payload: res.data,
            });
            dispatch(isLoading(false));
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};
