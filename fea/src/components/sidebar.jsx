import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <nav className="w-64 bg-gray-100 p-6">
      {/* Logo */}
      <div className="mb-8 text-center text-2xl font-bold text-blue-600">
        LOGO
      </div>
      {/* Navigation Links */}
      <ul className="space-y-6">
        <li>
          <Link
            to="/"
            className={`flex items-center rounded-lg px-4 py-3 ${
              location.pathname === "/"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-200 hover:text-blue-600"
            }`}
          >
            <img
              src="/img/dashboard.png"
              alt="Dashboard"
              className="mr-3 h-6 w-6"
            />
            <span className="font-medium">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/customers"
            className={`flex items-center rounded-lg px-4 py-3 ${
              location.pathname === "/customers"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-200 hover:text-blue-600"
            }`}
          >
            <img
              src="/img/customer.png"
              alt="Customers"
              className="mr-3 h-6 w-6"
            />
            <span className="font-medium">Customers</span>
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={`flex items-center rounded-lg px-4 py-3 ${
              location.pathname === "/products"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-200 hover:text-blue-600"
            }`}
          >
            <img
              src="/img/product.png"
              alt="Products"
              className="mr-3 h-6 w-6"
            />
            <span className="font-medium">Products</span>
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className={`flex items-center rounded-lg px-4 py-3 ${
              location.pathname === "/orders"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-200 hover:text-blue-600"
            }`}
          >
            <img src="/img/oders.png" alt="Orders" className="mr-3 h-6 w-6" />
            <span className="font-medium">Orders</span>
          </Link>
        </li>
        <li>
          <Link
            to="/invoice"
            className={`flex items-center rounded-lg px-4 py-3 ${
              location.pathname === "/invoice"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-200 hover:text-blue-600"
            }`}
          >
            <img
              src="/img/invoice.png"
              alt="Invoice"
              className="mr-3 h-6 w-6"
            />
            <span className="font-medium">Invoice</span>
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className={`flex items-center rounded-lg px-4 py-3 ${
              location.pathname === "/login"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-200 hover:text-blue-600"
            }`}
          >
            <img src="/img/login.png" alt="Login" className="mr-3 h-6 w-6" />
            <span className="font-medium">Login</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
