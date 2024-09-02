import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { clearSuccessMessage, clearError } from "../reducers/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const dispatch = useDispatch();
  const successMessage = useSelector((state) => state.auth.successMessage);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccessMessage());
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [successMessage, error, dispatch]);

  return (
    <div className="container">
      <div className="jumbotron custom-jumbotron mt-5">
        <h1 className="display-4">SpeakUP</h1>
        <p className="lead">
          This is an incrediable social media system with production level
          features!
        </p>
        <hr className="my-4" />
        <p>Click the Log In button</p>
        <Link className="btn btn-primary btn-lg" to="/login" role="button">
          Login
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
