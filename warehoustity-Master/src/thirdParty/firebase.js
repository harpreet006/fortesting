import firebase from "firebase/app";
import "firebase/messaging";
// import axios from 'axios';
// import axiosauth from '../../api/axios-auth';
import axiosauth from "../api/axios-auth";

var firebaseConfig = {
  apiKey: "AIzaSyD4xUoAj_QxHFkICwy6jQsioMWYO3tud60",
  authDomain: "warehousity-9ffc4.firebaseapp.com",
  databaseURL: "https://warehousity-9ffc4-default-rtdb.firebaseio.com",
  projectId: "warehousity-9ffc4",
  storageBucket: "warehousity-9ffc4.appspot.com",
  messagingSenderId: "234140312423",
  appId: "1:234140312423:web:6f806cb15e46288cb3c5c2",
  measurementId: "G-9RK6THWC8F",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export const getToken = (setTokenFound, isTokenFound) => {
  return messaging
    .getToken({
      vapidKey:
        "BLQ9DShzEQILzFdt4dy8bXSfySg09dSA_q5nivvqfnWWfKSuNHxquTxa-0tt8BfdwQg0xQfC9w6ukSUw9nrNftw",
    })
    .then((currentToken) => {
      if (currentToken) {
        if (!isTokenFound) {
          console.log("current token for client: ", currentToken);
          console.log("isTokenFound===>", isTokenFound);

          axiosauth
            .put("/api/v1/user/updatefcmtoken", {
              webFcmToken: currentToken,
            })
            .then((response) => console.log("token updated"));
        }

        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
