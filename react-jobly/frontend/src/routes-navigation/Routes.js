import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import CompanyList from "../companies/CompanyList";
import CompanyDetails from "../companies/CompanyDetails";
import JobList from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import EditProfileForm from "../profiles/EditProfileForm";
import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Accessing some Routes requires a user to be logged in.
 * Those routes are wrapped by <PrivateRoute>, which functions
 * as an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {
  console.debug("Routes", `login=${typeof login}`, `signup=${typeof signup}`);
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>

      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>

      <Route exact path="/signup">
        <SignupForm signup={signup} />
      </Route>

      <PrivateRoute exact path="/companies">
        <CompanyList />
      </PrivateRoute>

      <PrivateRoute exact path="/companies/:handle">
        <CompanyDetails />
      </PrivateRoute>

      <PrivateRoute exact path="/jobs">
        <JobList />
      </PrivateRoute>

      <PrivateRoute exact path="/profile">
        <EditProfileForm />
      </PrivateRoute>

      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
