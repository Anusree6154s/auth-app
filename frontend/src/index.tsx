import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

// Ensure that 'root' is either null or an HTML element
const root = document.getElementById("root") as HTMLElement | null;

if (root) {
  const rootElement = ReactDOM.createRoot(root);
  rootElement.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
