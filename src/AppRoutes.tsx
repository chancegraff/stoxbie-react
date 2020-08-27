import React from "react";
import {
  Route,
  Switch,
} from "react-router-dom";

import SearchRoutes from "routes/SearchRoutes";
import StockRoutes from "routes/StockRoutes";
import TradeRoutes from "routes/TradeRoutes";
import PageError from "components/PageTemplates/PageError";

const AppRoutes: React.FC = () =>
{
  return (
    <Switch>
      <Route path="/trade">
        <TradeRoutes />
      </Route>
      <Route path="/stock">
        <StockRoutes />
      </Route>
      <Route path="/oops">
        <PageError />
      </Route>
      <Route path="/">
        <SearchRoutes />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
