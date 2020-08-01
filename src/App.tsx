import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import BaseUI from "services/BaseUI";
import BackgroundContainer from "templates/BackgroundContainer";
import SearchRoutes from "routes/SearchRoutes";
import TradeRoutes from "routes/TradeRoutes";
import StockRoutes from "routes/StockRoutes";

const App: React.FC = () => (
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

export default App;
