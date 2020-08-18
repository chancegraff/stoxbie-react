import React from "react";

import GlobalFonts from "theme/fonts";

import AppBoilerplate from "./AppBoilerplate";
import AppRoutes from "./AppRoutes";

const App: React.FC = () =>
{
  return (
    <AppBoilerplate>
      <GlobalFonts />
      <AppRoutes />
    </AppBoilerplate>
  );
};

export default App;
