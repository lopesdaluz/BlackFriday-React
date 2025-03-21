// src/index.js
import React from "react";
import { createRoot } from "react-dom/client"; // Byt till createRoot
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
