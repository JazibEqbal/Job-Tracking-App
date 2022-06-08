import React from "react";
import styles from "./BarChartt.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function BarChartt({ data }) {
  return (
    <div className={styles.barChartt}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartt;
