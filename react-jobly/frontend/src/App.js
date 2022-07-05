import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes-navigation/Routes";
import Navigation from "./routes-navigation/Navigation";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";
import LoadingSpinner from "./common/LoadingSpinner";
import JoblyApi from "./api/api";
import jwt from "jsonwebtoken";

/** Jobly App.
 *
 * - infoLoaded: has user data been pulled from API?
 *  (this manages the loading spinner)
 *
 * - currentUser: user obj from API used to tell if someone
 *  is logged in. Passed around via context throughout app.
 *
 * - token: for logged in users, this is their auth JWT.
 *   Required to be set for most API calls. This is intially
 *   read from localStorage and synced to there via the
 *   useLocalStorage hook.
 *
 *   App -> Routes
 *
 */

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("jobly-token");

  console.debug(
    "App",
    "infoLoaded=",
    infoLoaded,
    "currentUser=",
    currentUser,
    "token=",
    token
  );

  /**Load user info from API. loadUserInfo() only runs if user is logged in and has a token.
   * loadUserInfo() only needs to re-run when a user logs out, so the value of the token
   * is a depndency for this useEffect().
   */

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            //put token on the API class and us it to call the API
            JoblyApi.token = token;
            let currentUser = await JoblyApi.getCurrentUser(username);
            setCurrentUser(currentUser);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      // set infoLoaded to false while async getCurrentUser() is running.
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  /** handle user logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** handle user signup.
   *
   * Automatically log user in (using setToken(token)) upon signup
   */
  async function signup(signupData) {
    try {
      //API sends back the token for the new user.
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handle user login */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { sucess: false, errors };
    }
  }

  /** Checks if a job has been applied for. */
  function hasAppliedForJob(jobId) {
    return applicationIds.has(jobId);
  }

  /** Apply to a job: make API call and update Set of application IDs. */
  function applyForJob(jobId) {
    if (hasAppliedForJob(jobId)) return;
    JoblyApi.applyForJob(currentUser.username, jobId);
    setApplicationIds(new Set([...applicationIds, jobId]));
    console.log(applicationIds);
  }
  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value={{ currentUser, setCurrentUser, hasAppliedForJob, applyForJob }}
        >
          <Navigation logout={logout} />
          <div className="container pt-5">
            <Routes login={login} signup={signup} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
