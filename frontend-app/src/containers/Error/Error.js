import { useEffect } from "react";
import { clearError, selctErrorMessage } from "../../reducers/errorSlices";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Error = () => {
  const errorMessage = useSelector(selctErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      toast.info(errorMessage);
      dispatch(clearError);
    }
  }, [errorMessage, dispatch]);

  return <ToastContainer position="top-right" autoClose={2000} />;
};

export default Error;
