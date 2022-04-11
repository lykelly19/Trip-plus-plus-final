import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { auth } from "../../firebase"

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const routerNavigate = useNavigate();

    const handleEmailChanges = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChanges = (e) => {
        setPassword(e.target.value)
    }

    const handleSignIn = () =>{
        signInWithEmailAndPassword(auth, email, password).then(() => {
            routerNavigate('/')
        }).catch((err) => {
            alert(err.message);
        });
    }

    return(
        <div className="loginPage">
            <div className = "loginContainer">
                <input type="email" value={email} onChange={handleEmailChanges}></input>
                <input type="password" value={password} onChange={handlePasswordChanges}></input>
                <button onClick={handleSignIn}>Sign In</button>
                <a href="">Create an account</a>
            </div>
        </div>
    )
}