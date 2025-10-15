import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const StaffLayout = () => {
  const staffLinks = [
    { path: "/staff/dashboard", label: "Dashboard" },
    { path: "/staff/pos", label: "POS / Checkout" },
    { path: "/staff/stock/receive", label: "Receive Stock" },
    { path: "/staff/stock/adjust", label: "Adjust Stock" },
    { path: "/staff/sales/history", label: "Sales History" },
    { path: "/staff/products/lookup", label: "Product Lookup" },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar links={staffLinks} />
      <div className="flex flex-col flex-1 bg-gray-50">
        <Navbar />
        <div className="p-6 overflow-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StaffLayout;
