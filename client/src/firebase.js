// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrywFIp_5lGZk6EoYe7jUUud2uaNwIgH4",
  authDomain: "trip-plus-plus-20a36.firebaseapp.com",
  projectId: "trip-plus-plus-20a36",
  storageBucket: "trip-plus-plus-20a36.appspot.com",
  messagingSenderId: "776132051288",
  appId: "1:776132051288:web:68c20eba550120bceba52d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);

export default app;