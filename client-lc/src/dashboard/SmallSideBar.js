import React from "react";
import styles from "./SmallSideBar.module.css";
import { FaTimes } from "react-icons/fa";
import links from "./Links";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.svg";
import { useStateValue } from "../StateProvider";
function SmallSideBar() {
  const [{ showSidebar }, dispatch] = useStateValue();
  const close = () => {
    dispatch({
      type: "TOGGLE__SIDEBAR",
    });
  };
  return (
    <div className={styles.smallSideBar}>
      <div
        className={
          showSidebar
            ? `${styles.smallSideBarContainer} ${styles.showsmallSideBar}`
            : `${styles.smallSideBarContainer}`
        }
      >
        <div className={styles.content}>
          <button type="button" className={styles.closeButton} onClick={close}>
            <FaTimes />
          </button>
          <img className={styles.smallsideBarLogo} src={logo} alt="logo" />
          <div className={styles.smallSideBarLinks}>
            {links.map((link) => {
              const { text, id, path, icon } = link;
              return (
                <NavLink
                  to={path}
                  key={id}
                  onClick={close}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.smLinks} ${styles.active}`
                      : `${styles.smLinks}`
                  }
                >
                  <span className={styles.icon}>{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallSideBar;
