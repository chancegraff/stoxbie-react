import React, {
  PropsHasChildren,
} from "react";
import {
  BrowserRouter,
} from "react-router-dom";

import AppTheme from "./AppTheme";

const AppBoilerplate: React.FC<PropsHasChildren> = (
  props,
) =>
{
  return (
    <AppTheme>
      <BrowserRouter>
        {props.children}
      </BrowserRouter>
    </AppTheme>
  );
};

export default AppBoilerplate;
