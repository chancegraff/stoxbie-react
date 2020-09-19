import React from "react";
import {
  RouteProps,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  createLogger,
} from "utils/Logger";

type Props = RouteProps;

const logger = createLogger(
  "AuthView",
);

const AuthView: React.FC<Props> = () =>
{
  logger.info(
    "Rendering logic and display",
  );

  return null;
};

export default AuthView;
