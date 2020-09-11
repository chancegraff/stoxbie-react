import React, {
  PropsHasClass,
} from "react";
import {
  Route,
  RouteProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import TradeView from "views/TradeView";
import PageError from "components/PageTemplates/PageError";

type Props = RouteProps & PropsHasClass;

const TradeRoutes: React.FC<Props> = () =>
{
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:ticker/:date`}>
        <TradeView css="" />
      </Route>
      <Route path={`${match.path}/:ticker`}>
        <PageError css="">
          Please select a date to trade from.
        </PageError>
      </Route>
      <Route path={match.path}>
        <PageError css="">
          Please select a stock to trade with.
        </PageError>
      </Route>
    </Switch>
  );
};

export default TradeRoutes;
