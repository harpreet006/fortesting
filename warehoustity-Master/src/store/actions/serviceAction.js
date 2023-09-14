import {
  SERVICE,
  SERVICE_BY_ID,
  SERVICE_CATEGORY,
  SERVICE_CATEGORY_BY_ID,
  SERVICE_SUBCATEGORY_BY_ID,
  SERVICE_SUBCATEGORY,
  SERVICE_ARRAY,
  IS_ERROR,
  IS_LOADING,
} from "../types";

import {
  SERVICE_URL,
  SERVICE_NEW_URL,
  SERVICE_CATEGORY_URL,
  SERVICE_SUBCATEGORY_URL,
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

export function serviceList(data) {
  return {
    type: SERVICE,
    payload: data,
  };
}

export function service_By_Id(data) {
  return {
    type: SERVICE_BY_ID,
    payload: data,
  };
}

export function serviceCategoryList(data) {
  return {
    type: SERVICE_CATEGORY,
    payload: data,
  };
}

export function serviceCategory_By_Id(data) {
  return {
    type: SERVICE_CATEGORY_BY_ID,
    payload: data,
  };
}

export function serviceSubCategoryList(data) {
  return {
    type: SERVICE_SUBCATEGORY,
    payload: data,
  };
}

export function serviceSubCategory_By_Id(data) {
  return {
    type: SERVICE_SUBCATEGORY_BY_ID,
    payload: data,
  };
}

// ###########  Services List ########

export const serviceByPage = (page) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let limit = 10;
    try {
      axiosauth
        .get(SERVICE_URL + `?page=${page}&limit=${limit}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(serviceList(res));
            dispatch(isLoading(false));
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {});
    } catch (e) {}
  };
};

export const serviceByPageV2 = (page) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(`/api/v1/servicerfq?page=${page}&limit=10&type=customer`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(serviceList(res));
            dispatch(isLoading(false));
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {});
    } catch (e) {}
  };
};

// Service Add to Favorite
export const addFavorite = (data, addToast) => {
  return async (dispatch) => {
    dispatch(isError(""));
    try {
      axiosauth
        .post(`/api/v1/servicerfq/addfavoriteservicerfq`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("res--->", res);
          addToast("Added to Favorite", {
            appearance: "success",
            autoDismiss: true,
          });
          dispatch(serviceFavoriteArray());
        })
        .catch((error) => {
          console.log("Error--->", error);
        })
        .then(() => {
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// Service Remove to Favorite
export const removeFavorite = (id, addToast) => {
  return async (dispatch) => {
    dispatch(isError(""));
    try {
      axiosauth
        .delete(`/api/v1/servicerfq/deletefavoriteservicerfq/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("res--->", res);
          dispatch(serviceFavorite(100))
          addToast("Remove From Favorite", {
            appearance: "warning",
            autoDismiss: true,
          });
          dispatch(serviceFavoriteArray());
        })
        .catch((error) => {
          console.log("Error--->", error);
        })
        .then(() => {
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// Favorite List
export const serviceFavorite = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(`/api/v1/servicerfq/fetchall/favoriteservicerfq?page=1&limit=100`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(serviceList(res));
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
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// Favorite List
export const serviceFavoriteArray = () => {
  return async (dispatch) => {
    try {
      axiosauth
        .get(`/api/v1/servicerfq/fetchall/favoriteservicerfq?page=1&limit=100`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            let arr = [];
            for (let i = 0; i < res.data.length; i++) {
              arr.push(res.data[i].service.id);
            }
            dispatch({
              type: SERVICE_ARRAY,
              payload: arr,
            });
          }
        })
        .catch((error) => {})
        .then(() => {
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ###########  Services List New List ########

export const serviceNewByPage = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(SERVICE_NEW_URL)
        .then((response) => {
          let res = JSON.parse(response.data);
          // if (res.statusCode === 200) {
          dispatch(serviceList(res));
          dispatch(isLoading(false));
          // }
          // else {
          // console.log("notification Fail")
          // }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ####################################################################
// ########################## Service List by category Id #############
// ####################################################################

export const serviceByCategryId = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(`/api/v1/services/fetchservicebycategory/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(serviceList(res.data));
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

// ###########  Services List New List ########

export const serviceNewById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(SERVICE_NEW_URL + `/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          // if (res.statusCode === 200) {
          dispatch(service_By_Id(res));
          dispatch(isLoading(false));
          // }
          // else {
          // console.log("notification Fail")
          // }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ###########  Services  New List by sub id ########

export const serviceNewBySubId = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(SERVICE_NEW_URL + `/homepage/?sub_id=${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(serviceList(res));
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

// ###########  Fecth Category by page ########

export const serviceCategoryByPage = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(SERVICE_CATEGORY_URL)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(serviceCategoryList(res));
          dispatch(isLoading(false));
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {});
    } catch (e) {}
  };
};

// ###########  Fecth Category by ID ########

export const serviceCategoryById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(SERVICE_CATEGORY_URL + `/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          // if (res.statusCode === 200) {
          dispatch(isLoading(false));
          dispatch(serviceCategory_By_Id(res));
          dispatch(isLoading(false));
          // }
          // else {
          // console.log("service Fail")
          // }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

// ###########  Fecth Sub Category by page ########

export const serviceSubCategoryByPage = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(SERVICE_SUBCATEGORY_URL)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(serviceSubCategoryList(res));
          dispatch(isLoading(false));
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

// ###########  Fecth Sub Category by Id ########

export const serviceSubCategoryById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(SERVICE_SUBCATEGORY_URL + `/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          console.log("ress--->", res);
          // if (res.statusCode === 200) {
          dispatch(serviceSubCategory_By_Id(res));
          dispatch(isLoading(false));
          // }
          // else {
          // console.log("service Fail")
          // }
        })
        .catch((error) => {
          console.log("errr--->", error);
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          console.log("-----always executes");
        });
    } catch (e) {}
  };
};

export const getSubCategoryById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(`/api/v1/services/categories/${id}/subcategories/homepage`)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(serviceSubCategoryList(res));
          dispatch(isLoading(false));
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

// =========================================

// ###########  Service By Id ############

export const serviceById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(SERVICE_URL + `/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(service_By_Id(res.data));
            dispatch(isLoading(false));
          } else {
            console.log("notification Details Fail");
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
