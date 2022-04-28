import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useHistory } from "react-router-dom";
import { createUser } from "../DB/users";
import { authErrors} from "./AuthErrorMessages"
import "./Register.css";

export default function Register() {
  const [userRegisterationInfo, setUserRegisterationInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errMessage, setErrMessage] = useState("");

  const handleErrorMessage = (errCode) =>{
    setErrMessage(authErrors[errCode]);
  }

  const registerNavigate = useNavigate();

  const handleRegister = () => {
    if (
      userRegisterationInfo.password !== userRegisterationInfo.confirmPassword
    ) {
      setErrMessage(
<<<<<<< HEAD
        "Password entered does not match, please confirm that the password are the same"
=======
        "Passwords entered don't match, please confirm that the password are the same"
>>>>>>> 7ca60ba (merge with main branch)
      );
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      userRegisterationInfo.email,
      userRegisterationInfo.password
    )
      .then(() => {
        onAuthStateChanged(auth, (user) => {
          createUser(user.uid);
        })
        registerNavigate("/");
      })
      .catch((err) => {
        handleErrorMessage(err.message);
      });
  };

  const handleBackFromRegister = () => {
    registerNavigate("/login");
  };

  return (
    <div>
      <div className="loginContainer col-12">
        <div className="card">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">
                <div className="text-center reg-intro">
                  <h4>Create your Trip++ account</h4>
                  <p>One account, just for you :)</p>
                </div>
                {/*<form onSubmit={handleRegister}>*/}
                <div className="container">
                  <div
                    style={{ display: !errMessage ? "none" : null }}
                    className="ErrMessage"
                  >
                    {errMessage}
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      className={
                        errMessage === "The email address is badly formatted."
                          ? "form-control err-box"
                          : "form-control"
                      }
                      type="email"
                      placeholder="Email"
                      value={userRegisterationInfo.email}
                      onChange={(e) => {
                        setUserRegisterationInfo({
                          ...userRegisterationInfo,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      data-bs-toggle="popover"
                      data-bs-trigger="focus"
                      data-bs-content="Password must be 8 characters long"
                      className={
                        errMessage ===
                          "The password must be 6 characters long or more." ||
                        errMessage ===
                          "Passwords entered don't match, please confirm that the password are the same"
                          ? "form-control err-box"
                          : "form-control"
                      }
                      type="password"
                      placeholder="Password"
                      value={userRegisterationInfo.password}
                      onChange={(e) => {
                        setUserRegisterationInfo({
                          ...userRegisterationInfo,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      id="confirm"
                      className={
                        errMessage ===
                          "The password must be 6 characters long or more." ||
                        errMessage ===
                          "Passwords entered don't match, please confirm that the password are the same"
                          ? "form-control err-box"
                          : "form-control"
                      }
                      type="password"
                      placeholder="Confirm Password"
                      value={userRegisterationInfo.confirmPassword}
                      onChange={(e) => {
                        setUserRegisterationInfo({
                          ...userRegisterationInfo,
                          confirmPassword: e.target.value,
                        });
                      }}
                    />
                  </div>
<<<<<<< HEAD
                  <div className="ErrMessage">
                    {errMessage}
                  </div>
=======
                  {/*
                  <div className="ErrMessage">
                    {errMessage}
                  </div>
                    */}
>>>>>>> 7ca60ba (merge with main branch)
                  <div className="text-center box-shadow pt-1 mb-5 pb-1">
                    <button
                      className="reg-btn btn btn-block input-block-level col-12"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                    {/*
                    <input
                      type="submit"
                      className="reg-btn btn btn-block input-block-level col-12"
                      value="Register"
                    />
                    */}
                  </div>
                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <button
                      className="back-btn btn box-shadow"
                      onClick={handleBackFromRegister}>
                      Go Back
                    </button>
                  </div>
                </div>
                {/*</form>*/}
              </div>
            </div>
            <div className="reg-side col-lg-6 d-flex align-items-center">
              <div className="px-3 py-4 p-md-5 mx-md 4">
                <h4>Why make an account?</h4>
                <p className="small mb-0">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non
                  iure ratione quasi molestiae quia? Aliquam quia sapiente aut
                  voluptas, deleniti ab saepe adipisci accusamus quisquam dicta
                  eligendi placeat molestiae impedit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
