import React from "react";
import { MdPendingActions } from "react-icons/md";
import { AiFillSchedule } from "react-icons/ai";
import { HiOutlineBan } from "react-icons/hi";
import styles from "./Stats.module.css";
import StatsItems from "./StatsItems";
import { useStateValue } from "../StateProvider";
function Stats() {
  const [{ stats }] = useStateValue();
  const defaultStats = [
    {
      title: "Pending Applications",
      count: stats.pending || 0,
    },
    {
      title: "Interview Applications",
      count: stats.interview || 0,
    },
    {
      title: "Declined Applications",
      count: stats.declined || 0,
    },
  ];
  return (
    <>
      <div className={styles.stats}>
        {/* Pending Applications */}
        <div className={styles.pendingApplications}>
          <div className={styles.innerContainer}>
            <h2 className={styles.pendingCount}>{defaultStats[0].count}</h2>
            <MdPendingActions
              className={`${styles.iconSize} ${styles.pendingIcon}`}
            />
            <h3 className={styles.pendingStatus}>{defaultStats[0].title}</h3>
          </div>
        </div>
        {/* Interviews Scheduled */}
        <div className={styles.interviewApplications}>
          <div className={styles.innerContainer}>
            <h2 className={styles.interviewCount}>{defaultStats[1].count}</h2>
            <AiFillSchedule
              className={`${styles.iconSize} ${styles.interviewIcon}`}
            />
            <h3 className={styles.interviewStatus}>{defaultStats[1].title}</h3>
          </div>
        </div>
        {/* Declined Applications */}
        <div className={styles.declinedApplications}>
          <div className={styles.innerContainer}>
            <h2 className={styles.declineCount}>{defaultStats[2].count}</h2>
            <HiOutlineBan
              className={`${styles.iconSize} ${styles.declinedIcon}`}
            />
            <h3 className={styles.declinedStatus}>{defaultStats[2].title}</h3>
          </div>
        </div>
      </div>
      <StatsItems />
    </>
  );
}

export default Stats;
