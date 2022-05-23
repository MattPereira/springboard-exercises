import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Calculator from "./Calculator";
import Home from "./Home";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/:operation/:num1/:num2">
        <Calculator />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
