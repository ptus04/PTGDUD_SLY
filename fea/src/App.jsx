import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import Product from "./components/Product";

function App() {
  return (
    <Router>
      <div className="flex h-screen flex-col md:flex-row">
        {/* Sidebar */}
        <div className="hidden bg-white shadow md:block md:w-1/4 lg:w-1/5">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <Header />

          {/* Content */}
          <main className="flex-1 bg-gray-50 p-4 sm:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<User />} />
              <Route path="/products" element={<Product />} />
              <Route path="/orders" element={<h1>Orders</h1>} />
              <Route path="/invoice" element={<h1>Invoice</h1>} />
              <Route path="/login" element={<h1>Login</h1>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
