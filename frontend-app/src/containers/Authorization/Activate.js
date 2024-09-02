import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verify } from "../../reducers/authSlice";
import "./AuthStyle/Activate.css";

const Verify = () => {
  const [verifyed, setVerifyed] = useState(false);
  const { uid, token } = useParams();
  const dispatch = useDispatch();

  const verify_account = (e) => {
    e.preventDefault();
    dispatch(verify({ uid, token }));
    setVerifyed(true);
  };

  if (verifyed) {
    return <Navigate to="/" />;
  }

  return (
    <div className="parent-container">
      <div className="login_form">
        <form>
          <button onClick={verify_account} type="button">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;
