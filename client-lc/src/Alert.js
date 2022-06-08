import React from "react";
import "./Alert.css";
import { useStateValue } from "./StateProvider";

function Alert() {
  const [{ alertType, alertText }] = useStateValue();
  return <div className={`alert alert__${alertType}`}>{alertText}</div>;
}

export default Alert;
