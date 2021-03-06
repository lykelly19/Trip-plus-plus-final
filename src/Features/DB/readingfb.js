import {db} from "../../firebase"
import { doc, getDoc} from "firebase/firestore";

import { auth } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const readPacking = async () =>{
    const docRef = doc(db, "users", getUserID());
    const docSnapshot = await getDoc(docRef);

    if(docSnapshot.exists()){
        console.log("Document data:", docSnapshot.data().packing);
    } else {
        console.log("No such document!");
    }

    return docSnapshot.data().packing;
}



const readLeftToPack = async () =>{
  const docRef = doc(db, "users", getUserID());
  const docSnapshot = await getDoc(docRef);

  if(docSnapshot.exists()){
    return docSnapshot.data().leftToPack;
  } else {
      console.log("No such document!");
  }

}



const readItinerary = async () =>{
  const docRef = doc(db, "users", getUserID());
  const docSnapshot = await getDoc(docRef);

  if(docSnapshot.exists()){
      console.log("Document data in IT:", docSnapshot.data().itinerary);
  } else {
      console.log("No such document!");
  }

  return docSnapshot.data().itinerary;
}



const readFirstLocation = async () =>{
  const docRef = doc(db, "users", getUserID());
  const docSnapshot = await getDoc(docRef);

  if(docSnapshot.exists()){
      console.log("Document data in FL :", docSnapshot.data().firstLocation);
  } else {
      console.log("No such document!");
  }

  return docSnapshot.data().firstLocation;
}


const readSuggestions = async () =>{
  const docRef = doc(db, "users", getUserID());
  const docSnapshot = await getDoc(docRef);

  if(docSnapshot.exists()){
      console.log("Document data in FL :", docSnapshot.data().suggestionsLeft);
  } else {
      console.log("No such document!");
  }

  return docSnapshot.data().suggestionsLeft;
}






const getUserID = () => {


    const auth = getAuth();
    const user = auth.currentUser.uid;
    
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
      return user;
    } else {
      alert("must be signed in");
    }
}

export {readPacking, getUserID, readLeftToPack, readItinerary, readFirstLocation, readSuggestions};