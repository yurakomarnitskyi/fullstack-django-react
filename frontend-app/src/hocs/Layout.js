import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { checkAuthenticated, loadUser } from "../reducers/authSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthenticated());
    dispatch(loadUser());
  }, []);

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
