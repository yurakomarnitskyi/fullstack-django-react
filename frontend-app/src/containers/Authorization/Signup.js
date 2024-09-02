import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../reducers/authSlice";
import axios from "axios";
import googleLogo from "../../logos/google.svg";
import facebookLogo from "../../logos/facebook.svg";
import "./AuthStyle/Signup.css";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const continueWithGoogle = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`
      );
      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  const continueWithFacebook = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`
      );
      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      dispatch(signup({ first_name, last_name, email, password, re_password }))
        .unwrap()
        .then(() => {
          // setAccountCreated(true);
          toast.success(
            "Successfully register, check your email and activate account!"
          );
        })
        .catch((error) => {
          const errorMessage =
            error?.email?.[0] ||
            error?.detail ||
            "Signup failed, please try again.";
          toast.error(errorMessage);
        });
    } else {
      toast.error("You must enter the same password twice.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // if (accountCreated) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className="parent-container">
      <div className="login_form">
        <form onSubmit={onSubmit}>
          <h3>Create your Account</h3>
          <div className="login_option">
            <div className="option">
              <button
                className="btn btn-white mt-3"
                onClick={continueWithGoogle}
              >
                <img
                  src={googleLogo}
                  alt="Google"
                  style={{ width: "34px", height: "34px" }}
                />
              </button>
            </div>
            <div className="option">
              <button
                className="btn btn-white mt-3"
                onClick={continueWithFacebook}
              >
                <img
                  src={facebookLogo}
                  alt="Apple"
                  style={{ width: "24px", height: "24px" }}
                />
              </button>
            </div>
          </div>
          <p className="separator">
            <span>or</span>
          </p>
          <div className="input_box">
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="input_box">
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="input_box">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="input_box">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="input_box">
            <input
              type="password"
              id="re_password"
              name="re_password"
              placeholder="Re Password"
              value={re_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button type="submit">Register</button>
          <p className="sign_up">
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Log In
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
