import React, {
  PropsHasChildren,
  PropsHasClass,
} from "react";
import {
  BrowserRouter,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import AppTheme from "./AppTheme";

const AppBoilerplate: React.FC<PropsHasChildren & PropsHasClass> = (
  {
    className,
    children,
  },
) =>
{
  return (
    <AppTheme className={className}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </AppTheme>
  );
};

export default AppBoilerplate;
