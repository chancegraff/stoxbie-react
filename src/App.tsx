import React from "react";
import {
  BrowserRouter, Route, Switch,
} from "react-router-dom";
import BaseUI from "utils/BaseUI";

import PageBackground from "templates/PageBackground";
import SearchRoutes from "routes/SearchRoutes";
import StockRoutes from "routes/StockRoutes";
import TradeRoutes from "routes/TradeRoutes";

const App: React.FC = () =>
{
  return (
    <BrowserRouter>
      <BaseUI>
        <PageBackground>
          <Switch>
            <Route path="/trade">
              <TradeRoutes />
            </Route>
            <Route path="/stock">
              <StockRoutes />
            </Route>
            <Route path="/">
              <SearchRoutes />
            </Route>
          </Switch>
        </PageBackground>
      </BaseUI>
    </BrowserRouter>
  );
};

export default App;
