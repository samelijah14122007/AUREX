import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";

import AppRouter from "./app/AppRouter";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    <AppRouter />
  </React.StrictMode>
);