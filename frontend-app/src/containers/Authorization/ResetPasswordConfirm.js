import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPasswordConfirm } from "../../reducers/authSlice";
import "./AuthStyle/ResetPasswordConfirm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordConfirm = () => {
  const dispatch = useDispatch();
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const { uid, token } = useParams();
  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (new_password === re_new_password) {
      dispatch(
        resetPasswordConfirm({ uid, token, new_password, re_new_password })
      )
        .unwrap()
        .then(() => {
          setRequestSent(true);
          toast.success("Password successfully changed!");
        })
        .catch((error) => {
          const errorMessage =
            error?.new_password?.[0] ||
            error?.detail ||
            "Password change failed, please try again.";
          toast.error(errorMessage);
        });
    } else {
      toast.error("You must enter the same password twice.");
    }
  };

  if (requestSent) {
    return <Navigate to="/" />;
  }

  return (
    <div className="parent-container">
      <div className="login_form">
        <form onSubmit={onSubmit}>
          <h3>Create new Password</h3>
          <div className="input_box">
            <input
              type="password"
              id="new_password"
              name="new_password"
              placeholder="New Password"
              value={new_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <div className="input_box">
            <input
              type="password"
              id="re_new_password"
              name="re_new_password"
              placeholder="Confirm New Password"
              value={re_new_password}
              onChange={(e) => onChange(e)}
              minLength="6"
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
