import React from "react";
import {
  RouteProps,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  createLogger,
} from "utils/Logger";

import AuthViewLogic from "./AuthView/AuthViewLogic";

type Props = RouteProps;

const logger = createLogger(
  "AuthView",
);

const AuthView: React.FC<Props> = () =>
{
  logger.debug(
    "Rendering logic and display",
  );

  return (
    <AuthViewLogic />
  );
};

export default AuthView;
