import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../common/SearchForm";
import JobCardList from "./JobCardList";

/**Show page with all jobs listed
 *
 * On component mount, load jobs from API
 * Re-load filtered jobs on submit of search form.
 *
 * This is routed to path "/jobs"
 *
 * Routes -> {JobCard, SearchForm}
 */

const JobList = () => {
  console.debug("JobList");

  const [jobs, setJobs] = useState(null);

  /* On component mount, load jobs from API */
  useEffect(function getJobsOnMount() {
    console.debug("JobList useEffect getJobsOnMount");
    search();
  }, []);

  /** Reloads jobs on search form submit. */
  async function search(name) {
    let jobs = await JoblyApi.getJobs(name);
    setJobs(jobs);
  }

  if (!jobs) return <LoadingSpinner />;

  return (
    <div className="col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {jobs.length ? <JobCardList jobs={jobs} /> : <p>No results found!</p>}
    </div>
  );
};

export default JobList;
