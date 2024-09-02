import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../reducers/authSlice";
import "./AuthStyle/ResetPassword.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
    setRequestSent(true);
  };

  if (requestSent) {
    return <Navigate to="/" />;
  }

  return (
    <div className="parent-container">
      <div className="login_form">
        <form onSubmit={onSubmit}>
          <div className="input_box">
            <label htmlFor="email">Request Password Reset</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
