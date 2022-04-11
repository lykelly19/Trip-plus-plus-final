import React, { useState, useEffect } from "react";
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword} from "firebase/auth";
import { useNavigate, useHistory } from "react-router-dom";

export default function Register(){
    const [userRegisterationInfo, setUserRegisterationInfo] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const registerNavigate = useNavigate();

    const handleRegister = () => {
        if(userRegisterationInfo.password !== userRegisterationInfo.confirmPassword){
            alert("Password entered does not match, please confirm that the password are the same");
            return;
        }
        createUserWithEmailAndPassword(
            auth, 
            userRegisterationInfo.email, 
            userRegisterationInfo.password
        ).then(() => {
            registerNavigate("/");
        }).catch((err) => alert(err.message));
    }

    const handleBackFromRegister = () => {
        registerNavigate("/login");
    }

    return(
        <div>
            <input 
                type="email" 
                placeholder="Email"
                value={userRegisterationInfo.email}
                onChange={(e) => {
                    setUserRegisterationInfo({
                        ...userRegisterationInfo,
                        email: e.target.value
                    })
                }}
            />
            <input 
                type="password" 
                placeholder="Password"
                value={userRegisterationInfo.password}
                onChange={(e) => {
                    setUserRegisterationInfo({
                        ...userRegisterationInfo,
                        password: e.target.value
                    })
                }}
            />
            <input 
                type="password" 
                placeholder="Confirm Password"
                value={userRegisterationInfo.confirmPassword}
                onChange={(e) => {
                    setUserRegisterationInfo({
                        ...userRegisterationInfo,
                        confirmPassword: e.target.value
                    })
                }}
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleBackFromRegister}>Back</button>
        </div>
    )
}