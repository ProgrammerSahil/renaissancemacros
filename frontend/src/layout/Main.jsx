import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Main;
