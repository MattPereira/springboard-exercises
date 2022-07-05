import React, { useState } from "react";
import { Input, Button, Form } from "reactstrap";

/** Search widget.
 *
 * Appears on CompanyList and JobList to filter results.
 *
 * This component renders the search form and callse the search
 * function prop that runs in the parent component
 *
 * {CompanyList, Joblist} => {SearchForm}
 *
 */

const SearchForm = ({ searchFor }) => {
  console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");

  /* Tell parent to filter */
  const handleSubmit = (e) => {
    e.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  };

  /* Update form fields */
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="row g-0 mb-3">
        <div className="col-sm-8">
          <Input
            id="searchTerm"
            name="searchTerm"
            placeholder="Enter search term.."
            bsSize="lg"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-4 row g-0">
          <Button type="submit" color="secondary" size="lg">
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SearchForm;
