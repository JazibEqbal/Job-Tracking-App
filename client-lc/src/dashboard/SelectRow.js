import React from "react";
import styles from "./SelectRow.module.css";
function SelectRow({ headingText, name, value, handleChange, list }) {
  return (
    <div className={styles.selectRow}>
      <h5 className={styles.selectRow__selectheading} htmlFor={name}>
        {headingText || name}
      </h5>
      <select
        className={styles.selectRow__select}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectRow;
