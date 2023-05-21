import React from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/BeatLoader";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const URL = process.env.REACT_APP_Url;
const Login = () => {
  const navigate = useNavigate();
  const [Loading, setloading] = useState(false);
  const { loading, error, dispatch } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({
    username: undefined,
    password: undefined,
  });
  const handleChange = (e) => {
    setLoginDetails((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      setloading(true);
      const res = await axios.post(`${URL}/Auth/login`, loginDetails);
      setloading(false);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      console.log(err);
      setloading(false);
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("pass is wrong");
    }
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <>
      <div className="bgcover"></div>
      <div className="login-container">
        <div className="login1Wrapper">
          <h1 className="log-h1">LOGIN</h1>
          <div className="login-form">
            <input
              className="login-input"
              placeholder="Enter username"
              type="text"
              id="username"
              onChange={handleChange}
            />
            <input
              className="login-input"
              placeholder="Enter password"
              type="text"
              id="password"
              onChange={handleChange}
            />
            <button className="loginBtn" onClick={handleClick}>
              LOGIN
            </button>
            {Loading && (
              <div className="scalelod">
                <ScaleLoader
                  color={"red"}
                  loading={Loading}
                  size={17}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}

            <div className="newuser">
              <p>
                New User{" "}
                <NavLink to={"/register"}>
                  <span className="signuptxt">Signup</span>
                </NavLink>
              </p>
              <p>
                Go{" "}
                <NavLink to={"/"}>
                  <span className="signuptxt">Home</span>
                </NavLink>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};

export default Login;
