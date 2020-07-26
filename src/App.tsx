import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BackgroundContainer from "templates/BackgroundContainer";
import TradeShares from "views/TradeShares";
import TickerSearch from "views/TickerSearch";
import BaseUI from "services/BaseUI";

const App: React.FC = () => (
  <BrowserRouter>
    <BaseUI>
      <BackgroundContainer>
        <Switch>
          <Route path="/trade">
            <TradeShares />
          </Route>
          <Route path="/">
            <TickerSearch />
          </Route>
        </Switch>
      </BackgroundContainer>
    </BaseUI>
  </BrowserRouter>
);

export default App;
