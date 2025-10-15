import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ links }) => {
  return (
    <div className="w-64 bg-gray-800 text-gray-100 min-h-screen p-4">
      <h2 className="text-lg font-bold mb-6 text-center">Menu</h2>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
