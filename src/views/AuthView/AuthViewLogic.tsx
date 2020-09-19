import React from "react";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  useScrollToTop,
} from "utils/Hooks";

import AuthViewDisplay from "./AuthViewDisplay";

type Props = unknown;

const AuthViewLogic: React.FC<Props> = () =>
{
  useScrollToTop();

  return (
    <AuthViewDisplay />
  );
};

export default AuthViewLogic;
