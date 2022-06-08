import React from "react";
import styles from './AreaChartt.module.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function AreaChartt({ data }) {
  return (
    <div className={styles.areaChartt}>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type="monotone" dataKey="count" fill="#bef8fd" stroke="#2cb1bc" />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}

export default AreaChartt;
