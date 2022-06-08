import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import { useStateValue } from "../StateProvider";
import { Navigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
function Navbar() {
  const [{user}, dispatch] = useStateValue();
  const [showLogout, setShowLogout] = useState(false);
  //Toggle Sidebar
  const toggleSidebar = () => {
    dispatch({
      type: "TOGGLE__SIDEBAR",
    });
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };
  const logoutUser = () => {
    dispatch({
      type: "LOGOUT_USER",
    });
    removeUserFromLocalStorage();
  };
  if(!user) {
    return <Navigate to='/landing' />
  }
  return (
    <nav className={styles.navbar}>
      <button
        type="button"
        className={styles.navbar__ToggleButton}
        onClick={toggleSidebar}
      >
        <FaAlignLeft />
      </button>
      <div>
        <h3 className={styles.navbar__header}>Dashboard</h3>
      </div>
      <div className={styles.navbar__profileContainer}>
        <button
          className={styles.navbar__dropdownButton}
          type="button"
          onClick={() => setShowLogout(!showLogout)}
        >
          <FaUserCircle />
          {user?.name}
          <FaCaretDown />
        </button>
        <div
          className={
            showLogout
              ? `${styles.logout} ${styles.show__logout}`
              : `${styles.logout}`
          }
        >
          <button
            className={styles.navbar__logoutButton}
            type="button"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
