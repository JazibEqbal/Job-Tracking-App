import React from "react";
import styles from "./SideBar.module.css";
import logo from "../images/logo.svg";
import links from "./Links";
import { useStateValue } from "../StateProvider";
import { NavLink } from "react-router-dom";
function SideBar() {
  const [{ showSidebar }] = useStateValue();
  //
  return (
    <div
      className={
        showSidebar
          ? `${styles.sideBar}`
          : `${styles.sideBar} ${styles.show__sideBar}`
      }
    >
      <div className={styles.content}>
        <header className={styles.head}>
          <img className={styles.sideBar__logo} src={logo} alt="logo" />
        </header>
        <div className={styles.bigsideBarLinks}>
          {links.map((link) => {
            const { text, id, path, icon } = link;
            return (
              <NavLink
                to={path}
                key={id}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.bigBarLinks} ${styles.active}`
                    : `${styles.bigBarLinks}`
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
  );
}

export default SideBar;

