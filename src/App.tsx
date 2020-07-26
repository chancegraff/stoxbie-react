import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BaseUI from "services/BaseUI";
import BackgroundContainer from "templates/BackgroundContainer";
import TickerSearch from "views/TickerSearch";
import TradeShares from "views/TradeShares";
import ViewStock from "views/ViewStock";

const App: React.FC = () => (
  <BrowserRouter>
    <BaseUI>
      <BackgroundContainer>
        <Switch>
          <Route path="/trade">
            <TradeShares />
          </Route>
          <Route path="/ticker">
            <ViewStock />
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
