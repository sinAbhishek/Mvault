import React from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./register.css";
const Register = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [Loading, setloading] = useState(false);
  const { loading, error, dispatch } = useContext(AuthContext);
  const [registerDetails, setregisterDetails] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const URL = process.env.REACT_APP_Url;
  const handleChange = (e) => {
    setregisterDetails((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const register = async () => {
    if (
      registerDetails.email.length == 0 ||
      registerDetails.username.length == 0 ||
      registerDetails.firstname.length == 0 ||
      registerDetails.lastname.length == 0 ||
      registerDetails.password.length == 0
    ) {
      setActive(true);
    } else {
      setloading(true);
      const res = await axios.post(`${URL}/Auth/register`, registerDetails);
      setloading(false);
      console.log(res.data);
      navigate("/login");
    }
  };
  return (
    <>
      <div className="bgcover"></div>
      <div className="login-container">
        <div className="loginWrapper">
          <h1 className="log-h1">REGISTER</h1>
          <div className="login-form">
            <input
              className="reg-input"
              placeholder="Enter Username"
              type="text"
              id="username"
              onChange={handleChange}
            />
            {active && registerDetails.username.length == 0 && (
              <label>Username cannot be empty</label>
            )}
            <input
              className="reg-input"
              placeholder="Enter FirstName"
              type="text"
              id="firstname"
              onChange={handleChange}
            />
            {active && registerDetails.firstname.length == 0 && (
              <label>Firstname cannot be empty</label>
            )}
            <input
              className="reg-input"
              placeholder="Enter LastName"
              type="text"
              id="lastname"
              onChange={handleChange}
            />
            {active && registerDetails.lastname.length == 0 && (
              <label>Lastname cannot be empty</label>
            )}
            <input
              className="reg-input"
              placeholder="Enter Email"
              type="text"
              id="email"
              onChange={handleChange}
            />
            {active && registerDetails.email.length == 0 && (
              <label>Email cannot be empty</label>
            )}
            <input
              className="reg-input"
              placeholder="Enter Password"
              type="text"
              id="password"
              onChange={handleChange}
            />
            {active && registerDetails.password.length == 0 && (
              <label>Password cannot be empty</label>
            )}
            <button onClick={register} className="loginBtn">
              REGISTER
            </button>
            <div className="scalelod">
              <ScaleLoader
                color={"red"}
                loading={Loading}
                size={17}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
            <div className="loginAlt">
              Already Registered?{" "}
              <NavLink to="/login">
                <p className="altLog">Login here</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
