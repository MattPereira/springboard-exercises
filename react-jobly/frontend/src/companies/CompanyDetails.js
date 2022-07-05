import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";
import JoblyApi from "../api/api";
import JobCard from "../jobs/JobCard";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";

const CompanyDetails = () => {
  const { handle } = useParams();

  console.debug("CompanyDetails", "handle=", handle);
  const [company, setCompany] = useState(null);

  /* On component mount, load company from API */
  useEffect(function getCompanyOnMount() {
    console.debug("CompanyList useEffect getCompanyOnMount");

    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }
    getCompany();
  }, []);

  if (!company) return <LoadingSpinner />;

  return (
    <div>
      <Card className="text-center bg-white p-3 rounded mb-3 col-md-10 offset-md-1">
        <CardBody>
          {company.logoUrl && (
            <div className="col-md-6 offset-md-3">
              <img
                src={company.logoUrl}
                alt={`${handle} logo`}
                className="mb-3 img-fluid"
              />
            </div>
          )}
          <CardTitle tag="h3">{company.name}</CardTitle>

          <CardText>{company.description}</CardText>
        </CardBody>
      </Card>
      <div className="col-md-8 offset-md-2">
        {company.jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={job.companyName}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyDetails;
