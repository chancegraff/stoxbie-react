import React, {
  PropsHasChildren,
} from "react";
import {
  BrowserRouter,
} from "react-router-dom";
import {
  RecoilRoot,
} from "recoil";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import AppTheme from "./AppTheme";

const AppBoilerplate: React.FC<PropsHasChildren> = (
  {
    children,
  },
) =>
{
  return (
    <RecoilRoot>
      <AppTheme css="">
        <BrowserRouter css="">
          {children}
        </BrowserRouter>
      </AppTheme>
    </RecoilRoot>
  );
};

export default AppBoilerplate;
