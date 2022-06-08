import React from "react";
import styles from "./Error.module.css";
import not_found from "./images/page_not_found.svg";
import { Link } from "react-router-dom";
function Error() {
  return (
    <div className={styles.error}>
      <img src={not_found} alt="not found" />
      <h2>Ohh! Page Not Found</h2>
      <p>We can't seem to find the page you're looking for</p>
      <Link className={styles.error__backHome} to="/">
        Back Home
      </Link>
    </div>
  );
}

export default Error;
