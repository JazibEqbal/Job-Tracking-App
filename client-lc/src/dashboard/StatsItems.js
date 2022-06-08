import React, { useEffect } from "react";
import { useStateValue } from "../StateProvider";
import axios from "axios";
import Loading from "./Loading";
import ChartContainer from "../StatCharts/ChartContainer";

function StatsItems() {
  const [{ isLoading, monthlyApplications }, dispatch] = useStateValue();
  const [state] = useStateValue();
  //
  //SHOW STATS
  const showStats = async () => {
    dispatch({
      type: "SHOW_STATS",
    });
    try {
      const { data } = await authFetch.get("/jobs/stats");
      dispatch({
        type: "SHOW_STATS_SUCCESS",
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    showStats();
    // eslint-disable-next-line
  },[]);
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
  if (isLoading) {
    return <Loading />;
  }
  return <div>{monthlyApplications.length > 0 && <ChartContainer />}</div>;
}

export default StatsItems;
