// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyD4xUoAj_QxHFkICwy6jQsioMWYO3tud60",
    authDomain: "warehousity-9ffc4.firebaseapp.com",
    databaseURL: "https://warehousity-9ffc4-default-rtdb.firebaseio.com",
    projectId: "warehousity-9ffc4",
    storageBucket: "warehousity-9ffc4.appspot.com",
    messagingSenderId: "234140312423",
    appId: "1:234140312423:web:6f806cb15e46288cb3c5c2",
    measurementId: "G-9RK6THWC8F"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Retrieve firebase messaging
  const messaging = firebase.messaging();
  
  messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });