import React from "react";
import JobCard from "./JobCard";

/** Show list of job cards.
 *
 * Used by both JobList and CompanyDetail to list jobs.
 *
 *
 * JobList -> JobCardList -> JobCard
 * CompanyDetail -> JobCardList -> JobCard
 */

const JobCardList = ({ jobs }) => {
  console.debug("JobCardList", "jobs=", jobs);

  return (
    <div className="JobCardList">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={job.companyName}
          companyHandle={job.companyHandle}
        />
      ))}
    </div>
  );
};

export default JobCardList;
