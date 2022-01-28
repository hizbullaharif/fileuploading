// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyA2fuUw2njCdYBoUb39dYLjAdD2mzjGk6c",
  authDomain: "fir-notification-a7f78.firebaseapp.com",
  projectId: "fir-notification-a7f78",
  storageBucket: "fir-notification-a7f78.appspot.com",
  messagingSenderId: "795294640929",
  appId: "1:795294640929:web:59924527e3c49dd0816c60",
  measurementId: "G-DCQ610RHV0",
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
