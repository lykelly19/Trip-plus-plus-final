// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbQlcXGi59M4uzYATw4Z6oBsdmLhVRRrQ",
  authDomain: "trip-plus-plus-5eb42.firebaseapp.com",
  projectId: "trip-plus-plus-5eb42",
  storageBucket: "trip-plus-plus-5eb42.appspot.com",
  messagingSenderId: "498066188188",
  appId: "1:498066188188:web:e1e1ba3bfe9f22615c8a59",
  measurementId: "G-S41RSK59XT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth()

export {db, auth}