import { TESTIMONIAL, TESTIMONIAL_BY_ID, IS_ERROR, IS_LOADING } from "../types";

import { TESTIMONIAL_URL } from "../../api/urls";

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

export function testimonialList(data) {
  return {
    type: TESTIMONIAL,
    payload: data,
  };
}

export function testimonial_By_Id(data) {
  return {
    type: TESTIMONIAL_BY_ID,
    payload: data,
  };
}

// ###########  Services List ########

export const testimonialByPage = (page) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let limit = 10;
    try {
      axiosauth
        .get(TESTIMONIAL_URL + `?page=${page}&limit=${limit}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(testimonialList(res));
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
