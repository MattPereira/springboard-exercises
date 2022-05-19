import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import VendingMachine from "./VendingMachine";
import Blueberries from "./Blueberries";
import Chocolates from "./Chocolates";
import Almonds from "./Almonds";

import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<VendingMachine />} />
          <Route exact path="/blueberries" element={<Blueberries />} />
          <Route exact path="/chocolates" element={<Chocolates />} />
          <Route exact path="/almonds" element={<Almonds />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/* <nav className="Navbar">
 <Link to="/vendingmachine">Vending Machine</Link>

<Link to="/chocolate">Chocolate</Link>
<Link to="/almonds">Almonds</Link>
</nav> */
