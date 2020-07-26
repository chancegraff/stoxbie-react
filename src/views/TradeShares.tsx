import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { Display3 } from "baseui/typography";
import ContentContainer from "templates/ContentContainer";
import LineChart from "components/LineChart";
import TradeInput from "components/TradeInput";
import styles from "./TradeShares.module.scss";

type Props = unknown;

const TradeShares: React.FC<Props> = () => {
  const match = useRouteMatch();
  return (
    <ContentContainer>
      <Switch>
        <Route path={`${match.path}/:ticker/:date`}>
          <LineChart className={styles.LineChart} />
          <TradeInput className={styles.TradeInput} />
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

export default TradeShares;
