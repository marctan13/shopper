import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import Cart from "./pages/Cart/Cart";
import Layout from "./component/Layout";
import { ShopContextProvider } from "./contexts/ShopContext";
import Register from "./pages/Login-Register/Register";
import Login from "./pages/Login-Register/Login";

function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes with Layout (including Navbar) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
          {/* Routes without Layout (excluding Navbar) */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;
