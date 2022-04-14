import React, { useState, useEffect } from "react";
import { auth } from "../../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function AuthButton(){
    const[buttonText, setButtonText] = useState("Sign In")
    const buttonNavigate = useNavigate();

    const handleSignIn = () => {
        buttonNavigate("/login")
    }

    const handleSignOut = () => {
        signOut(auth);
        buttonNavigate("/");
        alert("You have signout successfully")
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) =>{
            if(user){
                setButtonText("Sign Out");
            }
            else{
                setButtonText("Sign In");
            }
        })
    })
    
    if(buttonText == "Sign In"){
        return(
            <button id="authButton" onClick={handleSignIn}>{buttonText}</button>
        );
    } else {
        return(
            <button id="authButton" onClick={handleSignOut}>{buttonText}</button>
        )
    }

}