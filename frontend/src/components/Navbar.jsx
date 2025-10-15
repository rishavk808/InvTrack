import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3 border-b">
      <h1 className="text-xl font-semibold text-gray-700">
        Inventory Management
      </h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 capitalize">{role}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
