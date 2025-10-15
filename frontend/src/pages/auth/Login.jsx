import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      const { token, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      toast.success("Login successful!");

      if (role === "admin") navigate("/admin/dashboard");
      else navigate("/staff/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full rounded mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full rounded mb-3"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
