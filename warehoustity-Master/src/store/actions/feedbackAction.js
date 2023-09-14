import { FEEDBACK_URL } from "../../api/urls";

import axiosauth from "../../api/axios-auth";

// ###########  Fecth All Warehouse List ########

export const fetchFeedback = (setFeedback) => {
  return async (dispatch) => {
    try {
      axiosauth
        .get(FEEDBACK_URL)
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            setFeedback(res);
          }
        })
        .catch((error) => {})
        .then(() => {});
    } catch (e) {}
  };
};


export const fetchFeedbackById = (feedbackId, setFeedback) => {
    return async (dispatch) => {
      try {
        axiosauth
          .get(FEEDBACK_URL+`/${feedbackId}`)
          .then((response) => {
            let res = JSON.parse(response.data);
            if (res.statusCode === 200) {
              setFeedback(res);
            }
          })
          .catch((error) => {})
          .then(() => {});
      } catch (e) {}
    };
  };
  