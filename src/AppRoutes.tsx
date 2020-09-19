import React from "react";
import {
  Route,
  Switch,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  ROUTE_ORDER,
} from "utils/Constants";
import SearchView from "views/SearchView";
import StockView from "views/StockView";
import TradeView from "views/TradeView";
import PageError from "components/PageTemplates/PageError";

const AppRoutes: React.FC<unknown> = () =>
{
  return (
    <Switch>
      <Route
        exact={true}
        path={`${ROUTE_ORDER}/:ticker/:date`}
        component={TradeView}
      />
      <Route
        exact={true}
        path={`${ROUTE_ORDER}/:ticker`}
        component={StockView}
      />
      <Route
        exact={true}
        path="/"
        component={SearchView}
      />
      <Route
        path="/oops"
      >
        <PageError />
      </Route>
      <Route
        path="/"
        component={PageError}
      />
    </Switch>
  );
};

export default AppRoutes;
