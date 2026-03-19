import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./app/styles/index.css";
import "@mantine/core/styles.css";
import App from "./app/app";
import { AppProviders } from "./app/providers/appProviders";
import { registerServiceWorker } from "./pwa/registerServiceWorker";
import "./shared/i18n";

registerServiceWorker();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProviders>
  </StrictMode>,
);
