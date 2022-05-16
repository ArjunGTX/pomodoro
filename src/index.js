import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context";
import { makeServer } from "./server";
import "./styles/index.scss";
import { Toaster } from "react-hot-toast";

makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 2000,
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
