import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Login/Signup";
import Register from "./Login/Register";
import Home from"./Login/Home";
import Admin from "./Login/Admin";
import Product from "./Products/products";
import Addprooducts from "./Products/AddProducts";
import AllProducts from "./Products/AllProducts";
import Update from "./update/update";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products" element={<Product />} />
        <Route path="/all_products" element={<AllProducts />} />
        <Route path="/add_products" element={<Addprooducts />} />
        <Route path="update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
