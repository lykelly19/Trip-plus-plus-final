import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCbQlcXGi59M4uzYATw4Z6oBsdmLhVRRrQ",
  authDomain: "trip-plus-plus-5eb42.firebaseapp.com",
  projectId: "trip-plus-plus-5eb42",
  storageBucket: "trip-plus-plus-5eb42.appspot.com",
  messagingSenderId: "498066188188",
  appId: "1:498066188188:web:e1e1ba3bfe9f22615c8a59",
  measurementId: "G-S41RSK59XT"
};

// Use these to initialize the firebase app
const app = initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export {auth, db}