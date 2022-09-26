import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Main from "./pages/Main/Main";
import Search from "./components/Nav/Search";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

import ProductList from "./pages/ProductList/ProductList";

import Pay from "./pages/Pay/Pay";

const Router = () => {
  const [modalState, setModalState] = useState(false);
  return (
    <BrowserRouter>
      <Nav modalState={modalState} setModalState={setModalState} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/Products/:product_id"
          element={<ProductDetail setModalState={setModalState} />}
        />
        <Route
          path="/ProductList"
          element={
            <ProductList
              modalState={modalState}
              setModalState={setModalState}
            />
          }
        />
        <Route path="/Pay" element={<Pay />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
