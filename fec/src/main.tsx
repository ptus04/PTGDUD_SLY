import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.js";
import "./index.css";

// WARING: DO NOT ENABLE STRICT MODE OTHERWISE REACT WILL RENDER TWICE AND CAUSE ANY FECTH TO BE FAILED
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
