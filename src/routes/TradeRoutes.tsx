import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { Display3 } from "baseui/dist/typography";
import ContentContainer from "templates/ContentContainer";
import TradeView from "views/TradeView";

type Props = unknown;

const TradeRoutes: React.FC<Props> = () => {
  const match = useRouteMatch();
  return (
    <ContentContainer>
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
    </ContentContainer>
  );
};

export default TradeRoutes;
