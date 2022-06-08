import React from "react";
import styles from "./FormStructure.module.css";
function FormStructure({ type, value, name, handleChange, headingText }) {
  return (
    <div className={styles.formStructure}>
      <h5 className={styles.formStructure__heading} htmlFor={name}>
        {headingText || name}
      </h5>
      <input
        className={styles.formStructure__input}
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
}

export default FormStructure;
