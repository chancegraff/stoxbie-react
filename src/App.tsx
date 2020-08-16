import React from "react";

import AppBoilerplate from "./AppBoilerplate";
import AppRoutes from "./AppRoutes";

const App: React.FC = () =>
{
  return (
    <AppBoilerplate>
      <AppRoutes />
    </AppBoilerplate>
  );
};

export default App;
