import React from "react";
import {
  Route,
  RouteProps,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import PageError from "components/PageTemplates/PageError";

type Props = RouteProps;

const ErrorRoutes: React.FC<Props> = () =>
{
  return (
    <Route path="/oops">
      <PageError css="" />
    </Route>
  );
};

export default ErrorRoutes;
