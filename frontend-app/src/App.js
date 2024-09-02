import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Authorization/Login";
import Signup from "../src/containers/Authorization/Signup";
import Activate from "./containers/Authorization/Activate";
import ResetPassword from "./containers/Authorization/ResetPassword";
import ResetPasswordConfirm from "./containers/Authorization/ResetPasswordConfirm";
import Facebook from "./containers/Authorization/Facebook";
import Google from "./containers/Authorization/Google";
import Layout from "./hocs/Layout";
// import Error from "../containers/Error/Error";

function App() {
  return (
    <Router>
      <Layout>
        {/* <Error /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/facebook" element={<Facebook />} />
          <Route path="/google" element={<Google />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          />
          <Route path="/activate/:uid/:token" element={<Activate />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
