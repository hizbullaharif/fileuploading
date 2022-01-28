// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { onMessage } from "firebase/messaging";

initializeApp({
  apiKey: "AIzaSyA2fuUw2njCdYBoUb39dYLjAdD2mzjGk6c",
  authDomain: "fir-notification-a7f78.firebaseapp.com",
  projectId: "fir-notification-a7f78",
  storageBucket: "fir-notification-a7f78.appspot.com",
  messagingSenderId: "795294640929",
  appId: "1:795294640929:web:59924527e3c49dd0816c60",
  measurementId: "G-DCQ610RHV0",
});

export const messaging = getMessaging();

export const onMessageListener = () => console.log("foreground");
new Promise((resolve) => {
  onMessage(messaging, (payload) => {
    console.log("payload", payload);
    resolve(payload);
  });
});
