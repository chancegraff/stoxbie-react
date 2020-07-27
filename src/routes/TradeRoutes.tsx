import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { Display3 } from "baseui/dist/typography";
import TradeView from "views/TradeView";

type Props = unknown;

const TradeRoutes: React.FC<Props> = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:ticker/:date`}>
        <TradeView />
      </Route>
      <Route path={`${match.path}/:ticker`}>
        <Display3>Please select a date to trade from.</Display3>
      </Route>
      <Route path={match.path}>
        <Display3>Please select a stock to trade with.</Display3>
      </Route>
    </Switch>
  );
};

export default TradeRoutes;
