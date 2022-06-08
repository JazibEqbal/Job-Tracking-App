import axios from "axios";
import React, { useState } from "react";
import Alert from "../Alert";
import FormStructure from "../FormStructure";
import { useStateValue } from "../StateProvider";
import styles from "./Profile.module.css";
function Profile() {
  const [{ user, showAlert, isLoading }, dispatch] = useStateValue();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);
  //
  //AXIOS
  //
  const [state] = useStateValue();
  //
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        //logoutUser();
        console.log("Auth Error");
      }
      return Promise.reject(error);
    }
  );
  //
  //LOCAL STORAGE
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };
  //UPDATING USER
  //
  const updateUser = async (currentUser) => {
    dispatch({
      type: "UPDATE_USER",
    });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, token, location } = data;
      dispatch({
        type: "UPDATE_SUCCESS",
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage({ user, location, token });
      // console.log(data);
    } catch (error) {
      dispatch({
        type: "UPDATE_ERROR",
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
    //console.log(currentUser);
  };
  //
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: "CLEAR__ALERT",
      });
    }, 3000);
  };
  const displayAlert = () => {
    dispatch({
      type: "DISPLAY__ALERT",
    });
    clearAlert();
  };
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  };

  return (
    <div className={styles.profile}>
      <h2 className={styles.profile__header}>Profile</h2>
      <form onSubmit={handleSubmit} className={styles.profile__formMain}>
        {showAlert && <Alert />}
        <div classame={styles.profile__formContainer}>
          <FormStructure
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormStructure
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormStructure
            type="text"
            headingText="Last name"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormStructure
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button
            className={styles.profile__button}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Please wait" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
