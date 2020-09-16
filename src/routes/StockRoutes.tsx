import React from "react";
import {
  Route,
  RouteProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import StockView from "views/StockView";
import PageError from "components/PageTemplates/PageError";

const StockRoutes: React.FC<RouteProps> = () =>
{
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:ticker`}>
        <StockView css="" />
      </Route>
      <Route path={match.path}>
        <PageError css="">
          Please select a stock to view.
        </PageError>
      </Route>
    </Switch>
  );
};

export default StockRoutes;
