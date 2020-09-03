import React, {
  PropsHasChildren,
} from "react";
import {
  BrowserRouter,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import AppTheme from "./AppTheme";

const AppBoilerplate: React.FC<PropsHasChildren> = (
  {
    children,
  },
) =>
{
  return (
    <AppTheme css="">
      <BrowserRouter css="">
        {children}
      </BrowserRouter>
    </AppTheme>
  );
};

export default AppBoilerplate;
