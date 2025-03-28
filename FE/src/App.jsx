import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import AppContext from "./contexts/AppContext";
import { useState } from "react";

function App() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  return (
    <AppContext.Provider value={{ isNavBarOpen, setIsNavBarOpen }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
