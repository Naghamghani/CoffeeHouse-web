import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import CoffeeMenu from "./Pages/CoffeeMenu";
import DessertMenu from "./Pages/DessertMenu";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import AdminLogin from "./Pages/AdminLogin";

import { useState } from "react";
import "./global.css";

function App() {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const addOrder = (item) => {
    setOrders((prev) => [...prev, item]);
  };

  return (
    <Router>
      <Navbar onAuthChange={() => setRefresh((x) => x + 1)} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/menu"
          element={<CoffeeMenu key={"coffee-" + refresh} addOrder={addOrder} />}
        />

        <Route
          path="/dessert"
          element={<DessertMenu key={"dessert-" + refresh} addOrder={addOrder} />}
        />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<ContactUs orders={orders} />} />

        <Route
          path="/admin"
          element={<AdminLogin onAuthChange={() => setRefresh((x) => x + 1)} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
