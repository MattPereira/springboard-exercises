import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";

const Homepage = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="text-center">
      <h1 className="display-5">JOBLY HOMEPAGE</h1>
      <p className="lead">
        {" "}
        {currentUser ? (
          `Welcome back, ${currentUser.firstName} ${currentUser.lastName}!`
        ) : (
          <>
            <span>Welcome, please </span>
            <Link to="/signup">signup</Link>
            <span> or </span> <Link to="/login">login</Link>
            <span>!</span>
          </>
        )}{" "}
      </p>
    </div>
  );
};

export default Homepage;
