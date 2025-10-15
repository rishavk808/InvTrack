import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const adminLinks = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/users", label: "Staff Management" },
    { path: "/admin/register-staff", label: "Register Staff" },
    { path: "/admin/settings", label: "Settings" },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar links={adminLinks} />
      <div className="flex flex-col flex-1 bg-gray-50">
        <Navbar />
        <div className="p-6 overflow-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
