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

const OrderRoute: React.FC<unknown> = () =>
{
  return (
    <Switch>
      <Route
        path={`${ROUTE_ORDER}/:ticker/:date`}
      >
        <TradeView css="" />
      </Route>
      <Route
        path={`${ROUTE_ORDER}/:ticker`}
      >
        <StockView css="" />
      </Route>
      <Route
        path={`${ROUTE_ORDER}`}
      >
        <SearchView css="" />
      </Route>
    </Switch>
  );
};

export default OrderRoute;
