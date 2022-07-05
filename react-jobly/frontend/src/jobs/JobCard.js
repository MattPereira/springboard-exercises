import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
} from "reactstrap";

/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 *
 * JobCardList -> JobCard
 */

const JobCard = ({ id, title, salary, equity, companyName, companyHandle }) => {
  const { hasAppliedForJob, applyForJob } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  useEffect(
    function updateAppliedStatus() {
      console.debug("JobCard useEffect updateAppliedStatus", "jobId=", id);

      setApplied(hasAppliedForJob(id));
    },
    [id, hasAppliedForJob]
  );

  /**Handle applying for a job */
  async function handleApply(e) {
    if (hasAppliedForJob(id)) return;
    applyForJob(id);
    setApplied(true);
  }

  return (
    <Card className="text-center mb-3">
      <CardBody>
        <CardTitle tag="h4" className="mb-3">
          {title}
        </CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h5">
          <Link to={`/companies/${companyHandle}`}>{companyName}</Link>
        </CardSubtitle>
        <div className="col-md-8 offset-md-2">
          <Table bordered>
            <tbody>
              <tr>
                <th scope="row">Salary</th>
                <td>${salary}</td>
              </tr>
              <tr>
                <th scope="row">Equity</th>
                <td>{equity ? `${equity}%` : "None"}</td>
              </tr>
            </tbody>
          </Table>
          <Button
            color="danger"
            className="px-5"
            onClick={handleApply}
            disabled={applied}
          >
            {applied ? "Application Submitted" : "Apply"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default JobCard;
