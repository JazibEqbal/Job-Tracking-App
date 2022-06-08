import React, { useEffect } from "react";
import styles from "./Jobs.module.css";
import { useStateValue } from "../StateProvider";
import axios from "axios";
import DisplayAllJobs from "./DisplayAllJobs";
import Loading from "./Loading";
import PageButtonContainer from "./PageButtonContainer";
function Jobs() {
  const [state] = useStateValue();
  const [
    {
      jobs,
      totalJobs,
      numberOfPages,
      isLoading,
      search,
      searchStatus,
      searchType,
      sort,
      page,
    },
    dispatch,
  ] = useStateValue();
  //
  //
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: "CLEAR__ALERT",
      });
    }, 3000);
  };
  //
  //AXIOS
  //
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  //request
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
  //GET JOBS
  //
  const getJobs = async () => {
    const {page, search, searchStatus, searchType, sort } = state;
    //search query
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    //let url = `/jobs`;
    //handling search
    if (search) {
      url = url + `&search=${search}`;
    }
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
    clearAlert();
  };
  //for checking all jobs
  //
  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [page,search, searchStatus, searchType, sort]);
  //
  //LOADING
  if (isLoading) {
    return <Loading />;
  }
  //Displaying this if user has Zero jobs scheduled
  if (jobs.length === 0) {
    return <h3 className={styles.noJobs}>No Jobs Found</h3>;
  }
  //else this
  return (
    <div className={styles.jobs}>
      <h3 className={styles.numberOfJobs}>
        {totalJobs} Job{jobs.length > 1 && "s"} Found
      </h3>
      {jobs.map((job) => {
        // ...job means everything we have in job has to be displayed & passing it as a prop.
        return <DisplayAllJobs key={job._id} {...job} />;
      })}
      {numberOfPages > 1 && <PageButtonContainer />}
    </div>
  );
}

export default Jobs;
