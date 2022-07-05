import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { Route, Redirect } from "react-router-dom";

/** "Higher-Order Component" fro private routes.
 *
 * In routing component, use <PrivateRoute /> instead of <Route />.
 * This component will check if there is a valid current user, only
 * continuing onward to the route if there is. If no user is present,
 * redirect to login form.
 *
 */

const PrivateRoute = ({ exact, path, children }) => {
  const { currentUser } = useContext(UserContext);

  console.debug(
    "PrivateRoute",
    "exact=",
    exact,
    "path=",
    path,
    "currentUser=",
    currentUser
  );

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
};

export default PrivateRoute;
