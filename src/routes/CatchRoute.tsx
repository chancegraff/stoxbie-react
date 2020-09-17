import React from "react";
import {
  Route,
  RouteProps,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import PageError from "components/PageTemplates/PageError";

type Props = RouteProps;

const CatchRoute: React.FC<Props> = () =>
{
  return (
    <Route path="/">
      <PageError css="" />
    </Route>
  );
};

export default CatchRoute;
