import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import logo from "./images/logo.svg";
import FormStructure from "./FormStructure";
import Alert from "./Alert";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  //
  const initial = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };
  const navigate = useNavigate();
  //LOCAL state values
  const [values, setValues] = useState(initial);
  //GLOBAL values(Reducer)
  const [{ showAlert, isLoading, user }, dispatch] = useStateValue();
  //CLEAR ALERT
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: "CLEAR__ALERT",
      });
    }, 3000);
  };
  //DISPLAY ALERT
  const displayAlert = () => {
    dispatch({
      type: "DISPLAY__ALERT",
    });
    clearAlert();
  };
  //
  //TOGGLE
  const toggle = () => {
    setValues({
      ...values,
      isMember: !values.isMember,
    });
  };
  // Tracking input values
  const handleChange = (e) => {
    // console.log(e.target);
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  //USE EFFECT
  //REDIRECTING to dashboard if user exists
  // (/ = dashboard)
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);
  //
  //REGISTRING USER
  //
  const registerUser = async (currentUser) => {
    dispatch({
      type: "REGISTER_USER",
    });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      //console.log(response);
      //GETTING all three from post req
      const { user, token, location } = response.data;
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: {
          user,
          token,
          location,
        },
      });
      //Invoking user to LOCAL STORAGE
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      //console.log(error.response);
      dispatch({
        type: "REGISTER_ERROR",
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
   // console.log(currentUser);
  };
  //
  //
  //LOCAL STORAGE
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  //
  //LOGIN USER
  //
  const logInUser = async (currentUser) => {
    dispatch({
      type: "LOGIN_USER",
    });
    try {
      const response = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user,
          token,
          location,
        },
      });
      //Invoking user to LOCAL STORAGE
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  //
  //FORM submit
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    //PULLING out the values from data layer
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    //
    //CHECking if user exists or not(REGISTERING)
    const currentUser = { name, email, password };
    if (isMember) {
      logInUser(currentUser);
    } else {
      registerUser(currentUser);
    }
    //
    console.log(values);
  };
  //
  //
  return (
    <div className={styles.register}>
      <div className={styles.register__conatiner}>
        <form onSubmit={handleSubmit} className={styles.register__form}>
          <img className={styles.register__logo} src={logo} alt="" />
          <h3 className={styles.register__h3}>
            {values.isMember ? "Login" : "Register"}
          </h3>
          {showAlert && <Alert />}
          {/* Name Input */}
          {!values.isMember && (
            <FormStructure
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )}
          {/* Email Input */}
          <FormStructure
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          {/* Password Input */}
          <FormStructure
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          <button
            disabled={isLoading}
            type="submit"
            className={styles.register__button}
          >
            {values.isMember ? "Login" : "Register"}
          </button>
        </form>
        <p className={styles.register__p}>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggle} className={styles.register__b}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
