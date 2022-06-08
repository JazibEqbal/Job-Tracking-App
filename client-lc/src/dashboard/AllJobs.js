import React from "react";
import FormStructure from "../FormStructure";
import { useStateValue } from "../StateProvider";
import styles from "./AllJobs.module.css";
import Jobs from "./Jobs";
import SelectRow from "./SelectRow";
function AllJobs() {
  const [
    {
      isLoading,
      search,
      sortJobs,
      sortJobsOptions,
      jobTypeOptions,
      statusOptions,
      searchStatus,
      searchType,
    },
    dispatch,
  ] = useStateValue();
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
  const handleSearch = (e) => {
    if (isLoading) return;
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  //

  //
  const clearFilters = () => {
    dispatch({
      type: "CLEAR_FILTERS",
    });
  };

  //
  return (
    <>
      <div className={styles.allJobs}>
        <h2 className={styles.allJobs__header}>Search Jobs</h2>
        <form className={styles.allJobsForm}>
          <div className={styles.allJobs__formContainer}>
            <FormStructure
              type="text"
              name="search"
              value={search}
              headingText="Search"
              handleChange={handleSearch}
            />
            <SelectRow
              name="searchStatus"
              value={searchStatus}
              list={["all", ...statusOptions]}
              headingText="Status"
              handleChange={handleSearch}
            />
            <SelectRow
              name="searchType"
              value={searchType}
              list={["all", ...jobTypeOptions]}
              headingText="Job Type"
              handleChange={handleSearch}
            />
            <SelectRow
              name="sortJobs"
              value={sortJobs}
              list={sortJobsOptions}
              headingText="Sort"
              handleChange={handleSearch}
            />
            <button
              className={styles.allJobs__Clearbutton}
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                clearFilters();
              }}
            >
              Clear Filters
            </button>
          </div>
        </form>
      </div>
      <Jobs />
    </>
  );
}

export default AllJobs;
