import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider, TodoProvider } from "./context";
import { makeServer } from "./server";
import "./styles/index.scss";
import { Toaster } from "react-hot-toast";

makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TodoProvider>
          <App />
          <Toaster
            position="bottom-left"
            toastOptions={{
              duration: 2000,
            }}
          />
        </TodoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
