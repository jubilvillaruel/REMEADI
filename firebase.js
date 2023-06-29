// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXx3CUrMlV4dLuVUP3HZ6JjM9RSZ7gHn4",
  authDomain: "spiritwalk-89b9f.firebaseapp.com",
  projectId: "spiritwalk-89b9f",
  storageBucket: "spiritwalk-89b9f.appspot.com",
  messagingSenderId: "88492079976",
  appId: "1:88492079976:web:059e3b81bcbf908611b4dd",
  measurementId: "G-35WCCPCY4G"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db }