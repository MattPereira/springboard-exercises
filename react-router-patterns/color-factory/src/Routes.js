import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ColorList from "./ColorList";
import ColorDetails from "./ColorDetails";
import NewColorForm from "./NewColorForm";

const Routes = () => {
  const initialColors = JSON.parse(localStorage.getItem("colors")) || {
    red: "red",
    green: "green",
    blue: "blue",
  };

  const [colors, updateColors] = useState(initialColors);

  useEffect(
    () => localStorage.setItem("colors", JSON.stringify(colors)),
    [colors]
  );

  const addColor = (newColor) => {
    updateColors({ ...colors, ...newColor });
  };

  return (
    <Switch>
      <Route exact path="/colors">
        <ColorList colors={colors} />
      </Route>
      <Route exact path="/colors/new">
        <NewColorForm addColor={addColor} />
      </Route>
      <Route exact path="/colors/:color">
        <ColorDetails colors={colors} />
      </Route>
      <Redirect to="/colors" />
    </Switch>
  );
};

export default Routes;
