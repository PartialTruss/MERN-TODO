import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App.jsx";
import { TaskProvider } from "./context/Taskcontext.jsx";
import "./index.css";
import i18n from "./translation/i18n.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TaskProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </TaskProvider>
  </React.StrictMode>
);
