import {db} from "../../firebase"
import {setDoc, collection, getDocs, doc, getDoc} from "firebase/firestore";


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


export {readPacking};