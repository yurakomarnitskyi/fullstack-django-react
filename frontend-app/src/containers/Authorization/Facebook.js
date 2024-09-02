import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { facebookAuthenticate } from "../../reducers/authSlice";
import queryString from "query-string";

const Facebook = () => {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const values = queryString.parse(location.search);

    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;

    console.log("State: " + state);
    console.log("Code: " + code);

    if (state && code) {
      dispatch(facebookAuthenticate({ state, code }));
    }
  }, [location]);

  return (
    <div className="container">
      <div className="jumbotron custom-jumbotron mt-5">
        <h1 className="display-4">Welcome Auth System!</h1>
        <p className="lead">
          This is an incrediable auhentiacation system with production level
          features!
        </p>
        <hr className="my-4" />
        <p>Click the Log In button</p>
        <Link className="btn btn-primary btn-lg" to="/login" role="button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Facebook;
