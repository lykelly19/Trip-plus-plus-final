import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const routerNavigate = useNavigate();

  const handleEmailChanges = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChanges = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        routerNavigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleRegister = () => {
    routerNavigate("/register");
  };

  return (
    <div className="loginPage row d-flex justify-content-center">
      <div className="loginContainer col-12">
        <div className="card">
          <div className="row g-0">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">
                <div className="text-center sign-in-intro">
                  <h4>Please sign in to your account</h4>
                  <p>Just enter your email and password</p>
                </div>
                <form>
                  <div className="form-outline mb-4">
                    <input
                      id="email-login"
                      className="form-control"
                      type="email"
                      placeholder="email"
                      value={email}
                      onChange={handleEmailChanges}
                    ></input>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="password"
                      value={password}
                      onChange={handlePasswordChanges}
                    ></input>
                  </div>
                  <div className="text-center box-shadow pt-1 mb-5 pb-1">
                    <button
                      className="sign-in-btn btn btn-block input-block-level col-12"
                      onClick={handleSignIn}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <button
                      className="create-new-btn btn box-shadow"
                      onClick={handleRegister}
                    >
                      Create New
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="login-side col-lg-6 d-flex align-items-center">
              <div className="px-3 py-4 p-md-5 mx-md 4">
                <h4>About Us</h4>
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
