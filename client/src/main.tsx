import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./hook/useUser.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </UserProvider>
);
