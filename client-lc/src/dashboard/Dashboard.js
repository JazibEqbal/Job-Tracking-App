import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import SmallSideBar from "./SmallSideBar";
import styles from "./Dashboard.module.css";
function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <SmallSideBar />
      <SideBar />
      <div>
        <Navbar />
        <div className={styles.dashboardPage}>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
