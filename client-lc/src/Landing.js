import React from "react";
import styles from "./Landing.module.css";
import landing__image from "./images/landing-Image.jpg";
import logo from "./images/logo.svg";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <div className={styles.landing}>
      <nav>
        <img className={styles.landing__logo} src={logo} alt="" />
      </nav>
      <div className={styles.container}>
        <div className={styles.container__left}>
          <h2>
            Job <span>Tracking</span> App
          </h2>
          <p>
            Track yourself. Keep yourself upto date, manage and schedule your jobs and
            prepare according to your need.
          </p>
          <Link to="/register" className={styles.registerLink_button}>
            <button>Login/Register</button>
          </Link>
          <h5 className={styles.copyright}>
            @Copyright
            <h3 className={styles.owner}>Jazib Eqbal</h3>
          </h5>
        </div>

        <div className={styles.container__right}>
          <img
            className={styles.landingImage}
            src={landing__image}
            alt="LandingImage"
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
