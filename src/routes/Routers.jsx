import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import Login from "../pages/Auth";
import About from "../pages/About";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:foodId" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default Routers;
