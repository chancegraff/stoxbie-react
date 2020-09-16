import React from "react";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  createLogger,
} from "utils/Logger";
import GlobalFonts from "theme/fonts";
import KeyFrames from "theme/keyframes";

import AppBoilerplate from "./AppBoilerplate";
import AppRoutes from "./AppRoutes";

const logger = createLogger(
  "App",
);

const App: React.FC = () =>
{
  logger.debug(
    "Application started",
  );

  return (
    <AppBoilerplate css="">
      <GlobalFonts />
      <KeyFrames />
      <AppRoutes css="" />
    </AppBoilerplate>
  );
};

export default App;
