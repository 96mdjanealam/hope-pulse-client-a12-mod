import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

export default function MainLayout() {
  return (
    <div className="font-ysabeau-infant flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-50">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}