import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TradeShares from "views/TradeShares";
import TickerSearch from "views/TickerSearch";
import BaseUI from "services/BaseUI";

const App: React.FC = () => (
  <BrowserRouter>
    <BaseUI>
      <Switch>
        <Route path="/trade">
          <TradeShares />
        </Route>
        <Route path="/">
          <TickerSearch />
        </Route>
      </Switch>
    </BaseUI>
  </BrowserRouter>
);

export default App;
