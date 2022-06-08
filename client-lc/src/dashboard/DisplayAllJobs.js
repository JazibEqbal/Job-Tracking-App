import React from "react";
import styles from "./DisplayAllJobs.module.css";
import { FaBriefcase, FaLocationArrow } from "react-icons/fa";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import moment from "moment";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import axios from "axios";

function DisplayAllJobs({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  status,
  createdAt,
}) {
  const [{}, dispatch] = useStateValue();
  const[state] = useStateValue();
  //DATE FORMATING MOMENT
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  //
  //EDIT JOB
  const setEditJob = (id) => {
    dispatch({
      type: "SET_EDIT_JOB",
      payload: { id },
    });
    //checking id
    //console.log(`edit job with id  ${id}`);
  };
  //
  //AXIOS
  //
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log("Auth Error");
      }
      return Promise.reject(error);
    }
  );
  //
  const getJobs = async () => {
    
    let url = `/jobs`;
    dispatch({
      type: "GET_JOBS",
    });
    try {
      const { data } = await authFetch.get(url);
      const { jobs, totalJobs, numberOfPages } = data;
      dispatch({
        type: "GET_JOBS_SUCCESS",
        payload: {
          jobs,
          totalJobs,
          numberOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  //
  //DELETE JOB
  const deleteJob = async (jobId) => {
    dispatch({
      type: "DELETE_JOB",
    });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      //getting all the jobs
      getJobs();
    } catch (error) {
      console.log(error.response);
    }
  };
  //
  return (
    <div className={styles.displayAllJobs}>
      <div className={styles.displayAllJobs__Container}>
        <header className={styles.header__container}>
          <div className={styles.firstCharacter__company}>
            <h3>{company.charAt(0)}</h3>
          </div>
          <div className={styles.jobs__info}>
            <h3>{position}</h3>
            <p>{company}</p>
          </div>
        </header>
        <div className={styles.jobs__content}>
          <div className={styles.locationIcon}>
            <span className={styles.iconSpan}>
              <FaLocationArrow />
            </span>
            <span className={styles.textSpan}>{jobLocation}</span>
          </div>
          <div className={styles.dateIcon}>
            <span className={styles.iconSpan}>
              <BsFillCalendarCheckFill />
            </span>
            <span className={styles.textSpan}>{date}</span>
          </div>
          <div className={styles.jobType}>
            <span className={styles.iconSpan}>
              <FaBriefcase />
            </span>
            <span className={styles.textSpan}>{jobType}</span>
          </div>
          <div className={styles.Status}>
            <span className={styles.textSpan}>{status}</span>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Link
            to="/add-jobs"
            className={styles.editLink}
            onClick={() => setEditJob(_id)}
          >
            <a href="#edit" className={styles.editButton}>
              Edit
            </a>
          </Link>
          <button
            className={styles.deleteButton}
            type="button"
            onClick={() => deleteJob(_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisplayAllJobs;
