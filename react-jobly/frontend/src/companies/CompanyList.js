import React, { useState, useEffect } from "react";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../common/LoadingSpinner";
import SearchForm from "../common/SearchForm";

/** Show page with all companies listed
 *
 * On component mount, load companies from API
 * Re-load filtered companies on submit of search form.
 *
 * This is routed to path "/companies"
 *
 * Routes -> {CompanyCard, SearchForm}
 */

const CompanyList = () => {
  console.debug("CompanyList");

  const [companies, setCompanies] = useState(null);

  /* On component mount, load companies from API */
  useEffect(function getCompaniesOnMount() {
    console.debug("CompanyList useEffect getCompaniesOnMount");

    search();
  }, []);

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  if (!companies) return <LoadingSpinner />;

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />

      {companies.length ? (
        <div className="CompanyList-list">
          {companies.map((c) => (
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
              logoUrl={c.logoUrl}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
};

export default CompanyList;
