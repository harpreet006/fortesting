import {
  BOOKING,
  BOOKING_BY_ID,
  IS_ERROR,
  IS_LOADING,
  IS_PENDING,
  BOOKING_RESPONSE,
  BOOKING_LIST_WAREHOUSE,
} from "../../types";

import {
  BOOKING_URL,
  NEW_BOOKING_URL,
  CUSTOMER_BOOKING_URL,
  VENDOR_BOOKING_URL,
  UPDATE_BOOKING_URL,
} from "../../../api/urls";

import axiosauth from "../../../api/axios-auth";

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

export function bookingList(data) {
  return {
    type: BOOKING,
    payload: data,
  };
}

export function booking_By_Id(data) {
  return {
    type: BOOKING_BY_ID,
    payload: data,
  };
}

export function responseBooking(data) {
  return {
    type: BOOKING_RESPONSE,
    payload: data,
  };
}

// #########################################
// ########  Customer Booking Process ######
// #########################################

export const addNewBooking = (data) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .post(NEW_BOOKING_URL, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            let user = JSON.parse(localStorage.getItem("userData"));
            axiosauth
              .post(
                `/api/v1/warehousemap/${user?.account?.id}/${data.warehouse}`
              )
              .then((response) => {
                let res = JSON.parse(response.data);
                if (res.statusCode === 200) {
                }
              })
              .catch((error) => {
                console.log("warehouse map error=>", error);
              });

            dispatch(responseBooking(res));
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

export const customerBooking = (page) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let limit = 10;
    try {
      axiosauth
        .get(CUSTOMER_BOOKING_URL + `?page=${page}&limit=${limit}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(bookingList(res.data));
            dispatch(isLoading(false));
          } else {
            console.log("Booking Fail");
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

// Booking

export const customerBookingAuth = (page) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let limit = 10;
    try {
      axiosauth
        .get(`/api/v1/booking/customer/allbookings?page=${page}&limit=${limit}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(bookingList(res.data));
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

export const customerBookingById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(CUSTOMER_BOOKING_URL + `/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(booking_By_Id(res.data));
            dispatch(isLoading(false));
          } else {
            console.log("Booking Fail");
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

// #########################################
// ########  Customer Booking Process ######
// #########################################

export const getAllBooking = (page, data) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let limit = 10;
    try {
      axiosauth
        .post(VENDOR_BOOKING_URL + `?page=${page}&limit=${limit}`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(bookingList(res));
            dispatch(isLoading(false));
          } else {
            console.log("Booking Fail");
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

export const getAllBookingWarehouse = (page, data) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let limit = 10;
    try {
      axiosauth
        .post(VENDOR_BOOKING_URL + `?page=${page}&limit=${limit}`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch({
              type: BOOKING_LIST_WAREHOUSE,
              payload: res,
            });
            dispatch(isLoading(false));
          } else {
            console.log("Booking Fail");
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

// Vendor booking auth
export const vendorBookingAuth = (page, status) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    dispatch(bookingList([]));
    let limit = 10;
    try {
      axiosauth
        .get(
          `/api/v1/booking/vendor/allbookings?page=${page}&limit=${limit}&status=${status}`
        )
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(bookingList(res));
            dispatch(isLoading(false));
          } else {
            console.log("Booking Fail");
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

// Get Booking by id
export const getBookingById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(NEW_BOOKING_URL + `/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(booking_By_Id(res.data));
            dispatch(isLoading(false));
          } else {
            console.log("Booking Fail");
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

// Get Booking by id
export const getBookingByIdWithoutLoader = (id) => {
  return async (dispatch) => {
    dispatch(isError(""));
    try {
      axiosauth
        .get(NEW_BOOKING_URL + `/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(booking_By_Id(res.data));
          } else {
            console.log("Booking Fail");
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
        })
        .then(() => {
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// UPDATE STATUS BY VENDOR
export const updateBookingStatus = (id, data) => {
  return async (dispatch) => {
    dispatch(isPending(true));
    dispatch(isError(""));
    try {
      axiosauth
        .put(UPDATE_BOOKING_URL + `/${id}`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(responseBooking(res));
            dispatch(getBookingByIdWithoutLoader(id));
            dispatch(isPending(false));
          } else {
            console.log("Booking Fail");
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isPending(false));
        })
        .then(() => {
          dispatch(isPending(false));
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ###########  Fecth All Warehouse List ########

export const bookingByPage = (page) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let limit = 10;
    try {
      axiosauth
        .get(BOOKING_URL + `?page=${page}&limit=${limit}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("notification ressss===>", res);
          if (res.statusCode === 200) {
            dispatch(bookingList(res));
            dispatch(isLoading(false));
          } else {
            console.log("notification Fail");
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

// ###########  Fetch Warehouse By Id ############

export const bookingById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(BOOKING_URL + `/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(booking_By_Id(res.data));
            dispatch(isLoading(false));
          } else {
            console.log("booking Details Fail");
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
