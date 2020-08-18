import React from "react";

import GlobalFonts from "theme/fonts";
import KeyFrames from "theme/keyframes";

import AppBoilerplate from "./AppBoilerplate";
import AppRoutes from "./AppRoutes";

const App: React.FC = () =>
{
  return (
    <AppBoilerplate>
      <GlobalFonts />
      <KeyFrames />
      <AppRoutes />
    </AppBoilerplate>
  );
};

export default App;
