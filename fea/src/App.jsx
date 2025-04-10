import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./index.css";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <Header />

          {/* Content */}
          <main className="flex-1 bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<h1>Dashboard</h1>} />
              <Route path="/customers" element={<h1>Customers</h1>} />
              <Route path="/products" element={<h1>Products</h1>} />
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
