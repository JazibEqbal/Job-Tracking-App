import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import AreaChartt from "./AreaChartt";
import BarChartt from "./BarChartt";
import styles from "./ChartContainer.module.css";
function ChartContainer() {
  const [{ monthlyApplications: data }] = useStateValue();
  //setting area chart as default display chart
  const [areaChart, setAreaChart] = useState(true);
  //
  return (
    <div className={styles.ChartContainer}>
      <h3 className={styles.headingChart}>Monthly Applications</h3>
      <button
        className={styles.toggleChartButtom}
        type="button"
        onClick={() => {
          setAreaChart(!areaChart);
        }}
      >
        {areaChart ? "View Bar Chart" : "View AreaChart"}
      </button>
      {areaChart ? <AreaChartt data={data} /> : <BarChartt data={data} />}
    </div>
  );
}

export default ChartContainer;
