import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar({ dogs }) {
  const dogLinks = dogs.map((dog) => (
    <NavLink exact to={`/dogs/${dog.name.toLowerCase()}`} key={dog.name}>
      {dog.name}
    </NavLink>
  ));

  return (
    <nav className="Navbar">
      <NavLink exact to="/dogs">
        Home
      </NavLink>
      {dogLinks}
    </nav>
  );
}
// end

export default Navbar;
