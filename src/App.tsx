import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import BaseUI from "services/BaseUI";
import BackgroundContainer from "templates/BackgroundContainer";
import SearchRoutes from "routes/SearchRoutes";
import StockRoutes from "routes/StockRoutes";
import TradeRoutes from "routes/TradeRoutes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <BaseUI>
        <BackgroundContainer>
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
        </BackgroundContainer>
      </BaseUI>
    </BrowserRouter>
  );
};

export default App;
