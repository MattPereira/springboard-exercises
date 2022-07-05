import React from "react";
import UserContext from "./auth/UserContext";

const demoUser = {
  username: "mrRobot",
  firstName: "Elliot",
  lastName: "Alderson",
  email: "fsociety@gmail.com",
  photo_url: null,
};

const UserProvider = ({
  children,
  currentUser = demoUser,
  hasAppliedToJob = () => false,
}) => (
  <UserContext.Provider value={{ currentUser, hasAppliedToJob }}>
    {children}
  </UserContext.Provider>
);

export { UserProvider };
