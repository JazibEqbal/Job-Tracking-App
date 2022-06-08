import axios from "axios";
import Alert from "../Alert";
import FormStructure from "../FormStructure";
import { useStateValue } from "../StateProvider";
import styles from "./AddJobs.module.css";
import SelectRow from "./SelectRow";
function AddJobs() {
  const [
    {
      showAlert,
      isEditing,
      position,
      company,
      jobLocation,
      jobType,
      jobTypeOptions,
      status,
      statusOptions,
      isLoading,
    },
    dispatch,
  ] = useStateValue();
  //
  const [state] = useStateValue();
  //
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  //
  const handleChange = ({ name, value }) => {
    dispatch({
      type: "HANDLE_CHANGE",
      payload: {
        name,
        value,
      },
    });
  };
  //
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    //invoking create job
    createJob();
  };

  //EDIT job
  const editJob = async () => {
    dispatch({
      type: "UPDATE_JOB",
    });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: "UPDATE_JOB_SUCCESS",
      });
      dispatch({
        type: "CLEAR_VALUES",
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: "UPDATE_JOB_ERROR",
        payload: { msg: error.response.data.msg },
      });
    }
    clearValues();
    // console.log("Editing Job");
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: "CLEAR__ALERT",
      });
    }, 3000);
  };
  const displayAlert = () => {
    dispatch({
      type: "DISPLAY__ALERT",
    });
    clearAlert();
  };
  //
  //CLEAR BUTTON
  const clearValues = () => {
    dispatch({
      type: "CLEAR_VALUES",
    });
  };
  //
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
  //CREATE JOB
  const createJob = async () => {
    dispatch({
      type: "CREATE_JOB",
    });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: "CREATE_JOB_SUCCESS",
      });
      clearValues();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: "CREATE_JOB_ERROR",
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  //
  return (
    <div className={styles.addJobs}>
      <h2 className={styles.addJobs__header}>
        {isEditing ? "Edit Job" : "Add Job"}
      </h2>
      {showAlert && <Alert />}
      <form className={styles.addJobsForm}>
        <div className={styles.addJobs__formContainer}>
          <FormStructure
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormStructure
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormStructure
            type="text"
            name="jobLocation"
            headingText="Job Location"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <SelectRow
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
            headingText="Status"
          />
          <SelectRow
            headingText="Job Type"
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          <button
            className={styles.addJobs__button}
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isEditing ? "Update Job" : "Add Job"}
          </button>
          <button
            className={styles.addJobs__Clearbutton}
            onClick={(e) => {
              e.preventDefault();
              clearValues();
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddJobs;
