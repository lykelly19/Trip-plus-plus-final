import {db} from "../../firebase"
import {setDoc, collection, getDocs, doc, getDoc} from "firebase/firestore";
import { CommonItems } from "../Suggestions.js"
const createUser = async (user) => {
    const docData = {
        budgeting: [],
        itinerary: [],
        packing:[],
        leftToPack: 0,
        firstLocation: {eventName: "select an event name", date: "select a time", time: "select a time", location: "select a location"},
        suggestionsLeft: CommonItems,
    }
    await setDoc(doc(db, "users", user), docData);
}

const readAllUser = async() => {
    const snapshot = await getDocs(collection(db, "users"));

    const allUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    console.log(allUsers);
    return allUsers;
}

const readUserByID = async (userID) =>{
    const docRef = doc(db, "users", userID);
    const docSnapshot = await getDoc(docRef);

    if(docSnapshot.exists()){
        console.log("Document data:", docSnapshot);
    } else {
        console.log("No such document!");
    }
}

export {createUser, readAllUser, readUserByID};