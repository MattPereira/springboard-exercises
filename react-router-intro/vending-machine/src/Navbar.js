import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <NavLink exact to="/">
        Vending Machine
      </NavLink>
      <NavLink exact to="/blueberries">
        Bluberries
      </NavLink>
      <NavLink exact to="/chocolates">
        Chocolates
      </NavLink>
      <NavLink exact to="/almonds">
        Almonds
      </NavLink>
    </nav>
  );
};

export default Navbar;
