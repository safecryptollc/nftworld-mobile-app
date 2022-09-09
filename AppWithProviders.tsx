import React from "react";
import App from "./MainApp";
import { AppProviders } from "./AppProviders";

export default () => (
  <AppProviders>
    <App />
  </AppProviders>
);
