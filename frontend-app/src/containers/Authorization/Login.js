import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./AuthStyle/Login.css";
import googleLogo from "../../logos/google.svg";
import facebookLogo from "../../logos/facebook.svg";
import { login } from "../../reducers/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {})
      .catch((error) => {
        const errorMessage = error?.detail || "Login failed, please try again.";
        toast.error(errorMessage);
      });
  };

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

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="parent-container">
      <div className="login_form">
        <form onSubmit={onSubmit}>
          <h3>Log in with</h3>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={email}
              name="email"
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="input_box">
            <div className="password_title">
              <label htmlFor="password">Password</label>
              <Link to="/reset-password">Forgot Password?</Link>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button type="submit">Log In</button>
          <p className="sign_up">
            Don't have an account?{" "}
            <Link to="/signup" style={{ textDecoration: "none" }}>
              Sign up
            </Link>
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
