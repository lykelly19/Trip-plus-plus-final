import {db} from "../../firebase"
import { doc, getDoc} from "firebase/firestore";

import { auth } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const readPacking = async () =>{
    const docRef = doc(db, "users", "userID");
    const docSnapshot = await getDoc(docRef);

    if(docSnapshot.exists()){
        console.log("Document data:", docSnapshot.data());
    } else {
        console.log("No such document!");
    }

    return docSnapshot.data.packing;
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

export {readPacking, getUserID};