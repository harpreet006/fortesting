import {
  DASHBOARD,
  DASHBOARD_CATEGORY,
  DASHBOARD_RESPONSE,
  VENDOR_DEMOGRAPHY,
  CUSTOMER_DEMOGRAPHY,
  VENDORDATA,
  IS_ERROR,
  IS_LOADING,
  IS_PENDING,
  VENDOR_NUMBER_OF_WAREHOUSE,
  VENDOR_SPACE_CATEGORY,
} from "../types";

import {
  DASHBOARD_URL,
  DASHBOARD_CATEGORY_URL,
  DASHBOARD_VENDOR_URL,
  VENDOR_DEMOGRAPHY_URL,
  CUSTOMER_DEMOGRAPHY_URL,
} from "../../api/urls";

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

export function isPending(bool) {
  return {
    type: IS_PENDING,
    isLoading: bool,
  };
}

export function dashboardList(data) {
  return {
    type: DASHBOARD,
    payload: data,
  };
}

export function vendordashboardDetail(data) {
  return {
    type: VENDORDATA,
    payload: data,
  };
}

export function vendorWarehouseNumber(data) {
  return {
    type: VENDOR_NUMBER_OF_WAREHOUSE,
    payload: data,
  };
}

export function vendordashboardCategory(data) {
  return {
    type: VENDOR_SPACE_CATEGORY,
    payload: data,
  };
}

export function dashboardCategoryList(data) {
  return {
    type: DASHBOARD_CATEGORY,
    payload: data,
  };
}

export function responseDashboard(data) {
  return {
    type: DASHBOARD_RESPONSE,
    payload: data,
  };
}

// ###########  Fecth All Dashboard data ########

export const getDashboardV2 = (search) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    dispatch(dashboardList(null));
    try {
      axiosauth
        .get(`/api/v1/dashboard/customer?search=${search}`)
        .then((response) => {
          let res =JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(dashboardList(res.data));
            dispatch(isLoading(false));
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
        })
        .then(() => {
          // dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// ###########  Fecth All bookingList ########

export const getDashboard = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let userId = JSON.parse(localStorage.getItem("userData"));
    let data = {
      userId: userId?.id,
      customerDashboard: [
        "cart",
        "query",
        "totalRequestWhbooking",
        "bookingRequestAttended",
        "bookingRequestUnAttended",
        "confirmedBooking",
        "bookingRequestHoldLost",
        "typeOfWarehouses",
        "agreementExpire",
        "industryProductSpecific",
        "spaceLocationWarehouse",
        "notification",
        "orderPending",
        "spaceBookedWhs",
        "stateCount",
        "citiesCount",
        "pinCount",
        "noOfWarehouses",
      ],
    };
    try {
      axiosauth
        .post(DASHBOARD_URL, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            //console.log("Dashboar res===>", res.data)
            dispatch(dashboardList(res.data));
            dispatch(isLoading(false));
          } else {
            //console.log("dashboard Fail")
          }
        })
        .catch((error) => {
          dispatch(isLoading(false));
          dispatch(isError(error.message));
        })
        .then(() => {
          dispatch(isLoading(false));
          //console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ###########  Fecth All bookingList ########

export const getDashboardCategory = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let userId = JSON.parse(localStorage.getItem("userData"));
    let data = {
      userId: userId?.id,
      // "customerDashboard": ["cart", "query", "totalRequestWhbooking", "bookingRequestAttended", "bookingRequestUnAttended", "confirmedBooking", "bookingRequestHoldLost", "typeOfWarehouses", "agreementExpire", "industryProductSpecific", "spaceLocationWarehouse", "notification", "orderPending", "spaceBookedWhs", "stateCount", "citiesCount", "pinCount", "noOfWarehouses"]
    };
    try {
      axiosauth
        .post(DASHBOARD_CATEGORY_URL, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            //console.log("Dashboar res===>", res.data)
            dispatch(dashboardCategoryList(res.data));
            dispatch(isLoading(false));
          } else {
            //console.log("dashboard Fail")
          }
        })
        .catch((error) => {
          dispatch(isLoading(false));
          dispatch(isError(error.message));
        })
        .then(() => {
          dispatch(isLoading(false));
          //console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// New V2 api for vendor dashboard

// ###########  Fecth All vendorDashboard ########

export const vendorDashboardV2 = (search) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));

    try {
      axiosauth
        .get(`/api/v1/dashboard/vendor?search=${search}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            //console.log("vendor Dashboar res===>", res.data)
            dispatch(vendordashboardDetail(res.data));
            dispatch(isLoading(false));
          }
        })
        .catch((error) => {
          dispatch(isLoading(false));
          dispatch(isError(error.message));
        })
        .then(() => {
          dispatch(isLoading(false));
          //console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ###########  Fecth All vendorDashboard ########

export const vendorDashboard = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let userId = JSON.parse(localStorage.getItem("userData"));
    let data = {
      userId: userId?.id,
      vendorDashboard: [
        "warehousesListingRequestPlaced",
        "warehouseNotSubmitApproval",
        "totalListedWarehouses",
        "pendingForListing",
        "operationalWarehouses",
        "typeOfWarehouse",
        "agreementAboutExpire",
        "rfqStats",
        "totalspaceRegisteredWithWHS",
        "availableSpace",
        "spaceWarehouseCategory",
        "spaceBookedWHS",
        "stateCount",
        "citiesCount",
        "pincodeCount",
        "noOfWarehouses",
      ],
    };
    try {
      axiosauth
        .post(DASHBOARD_VENDOR_URL, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            //console.log("vendor Dashboar res===>", res.data)
            dispatch(vendordashboardDetail(res.data));
            dispatch(isLoading(false));
          } else {
            //console.log("dashboard Fail")
          }
        })
        .catch((error) => {
          dispatch(isLoading(false));
          dispatch(isError(error.message));
        })
        .then(() => {
          dispatch(isLoading(false));
          //console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ###########  Fecth All vendorDashboard ########

export const vendorDashboardNoOFWarehouse = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let userId = JSON.parse(localStorage.getItem("userData"));
    let data = {
      userId: userId?.id,
      vendorDashboard: [
        "warehousesListingRequestPlaced",
        "warehouseNotSubmitApproval",
        "totalListedWarehouses",
        "pendingForListing",
        "operationalWarehouses",
        "typeOfWarehouse",
        "agreementAboutExpire",
        "rfqStats",
        "totalspaceRegisteredWithWHS",
        "availableSpace",
        "spaceWarehouseCategory",
        "spaceBookedWHS",
        "stateCount",
        "citiesCount",
        "pincodeCount",
        "noOfWarehouses",
      ],
    };
    try {
      axiosauth
        .post("/api/v1/dashboard/vendor", data)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            //console.log("vendor Dashboar res===>", res.data)
            dispatch(vendorWarehouseNumber(res.data));
            dispatch(isLoading(false));
          } else {
            //console.log("dashboard Fail")
          }
        })
        .catch((error) => {
          dispatch(isLoading(false));
          dispatch(isError(error.message));
        })
        .then(() => {
          dispatch(isLoading(false));
          //console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ###########  Fecth All vendorDashboard ########

export const vendorDashboardCategory = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let userId = JSON.parse(localStorage.getItem("userData"));
    let data = {
      userId: userId?.id,
      vendorDashboard: [
        "warehousesListingRequestPlaced",
        "warehouseNotSubmitApproval",
        "totalListedWarehouses",
        "pendingForListing",
        "operationalWarehouses",
        "typeOfWarehouse",
        "agreementAboutExpire",
        "rfqStats",
        "totalspaceRegisteredWithWHS",
        "availableSpace",
        "spaceWarehouseCategory",
        "spaceBookedWHS",
        "stateCount",
        "citiesCount",
        "pincodeCount",
        "noOfWarehouses",
      ],
    };
    try {
      axiosauth
        .post(`/api/v1/dashboard/vendor/spacewarehousecategory`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            //console.log("vendor Dashboar res===>", res.data)
            dispatch(vendordashboardCategory(res.data));
            dispatch(isLoading(false));
          } else {
            //console.log("dashboard Fail")
          }
        })
        .catch((error) => {
          dispatch(isLoading(false));
          dispatch(isError(error.message));
        })
        .then(() => {
          dispatch(isLoading(false));
          //console.log("-----always executes");
        });
    } catch (e) {}
  };
};

var colorArray = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

// Demography APIS
export const getCustomerDemograpgy = (data) => {
  console.log("dat", data);
  let { city, state } = data;
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .post(CUSTOMER_DEMOGRAPHY_URL, { state: state })
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            let arr = [];
            let coordinateArray = [];
            for (let j = 0; j < res.data?.length; j++) {
              if (city) {
                if (res.data[j].key.toLowerCase() === city.toLowerCase()) {
                  arr.push({
                    title: res.data[j].key,
                    value: res.data[j].count,
                    color: colorArray[j],
                  });
                  coordinateArray.push({
                    lat: parseFloat(res.data[j].lat),
                    lng: parseFloat(res.data[j].long),
                  });
                }
              } else {
                arr.push({
                  title: res.data[j].key,
                  value: res.data[j].count,
                  color: colorArray[j],
                });
                coordinateArray.push({
                  lat: parseFloat(res.data[j].lat),
                  lng: parseFloat(res.data[j].long),
                });
              }
            }

            dispatch({
              type: CUSTOMER_DEMOGRAPHY,
              payload: {
                data: arr,
                coordinates: coordinateArray,
                totalWarehouse: res.totalWarehouse,
              },
            });
            dispatch(isLoading(false));
          }
        })
        .catch((error) => {
          dispatch(isLoading(false));
          dispatch(isError(error.message));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// VENDOR_DEMOGRAPHY APIS
export const getVendorDemograpgy = (data) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .post(VENDOR_DEMOGRAPHY_URL, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            let arr = [];
            for (let j = 0; j < res.data?.length; j++) {
              arr.push({
                title: res.data[j].key,
                value: res.data[j].count,
                color: colorArray[j],
              });
            }

            dispatch({
              type: VENDOR_DEMOGRAPHY,
              payload: {
                data: arr,
                totalWarehouse: res.totalWarehouse,
              },
            });
            dispatch(isLoading(false));
          }
        })
        .catch((error) => {
          dispatch(isLoading(false));
          dispatch(isError(error.message));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};
