import React from "react";
import {
  Route,
  Switch,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import SearchRoutes from "routes/SearchRoutes";
import StockRoutes from "routes/StockRoutes";
import TradeRoutes from "routes/TradeRoutes";
import PageError from "components/PageTemplates/PageError";

const AppRoutes: React.FC<unknown> = () =>
{
  return (
    <Switch>
      <Route path="/trade">
        <TradeRoutes css="" />
      </Route>
      <Route path="/stock">
        <StockRoutes css="" />
      </Route>
      <Route path="/oops">
        <PageError css="" />
      </Route>
      <Route path="/">
        <SearchRoutes css="" />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
