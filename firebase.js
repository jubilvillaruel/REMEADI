// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2rU-PrYKqgu3qSEDQ2FNPpVgSdSM-gTM",
  authDomain: "remeadi.firebaseapp.com",
  databaseURL: "https://remeadi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "remeadi",
  storageBucket: "remeadi.appspot.com",
  messagingSenderId: "282078135356",
  appId: "1:282078135356:web:191253140851c866b92f39",
  measurementId: "G-VLS4YJSSV7"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

// realtime database
const app = initializeApp(firebaseConfig)
const realtimeDB = getDatabase(app)

export { auth, db, realtimeDB }