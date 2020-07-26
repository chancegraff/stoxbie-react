import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { Display3 } from "baseui/typography";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import ContentContainer from "templates/ContentContainer";
import RewindCalendar from "components/RewindCalendar";
import styles from "./ViewStock.module.scss";

type Props = unknown;

const ViewStock: React.FC<Props> = () => {
  const match = useRouteMatch();
  return (
    <ContentContainer>
      <Switch>
        <Route path={`${match.path}/:ticker`}>
          <BreadcrumbContainer />
          <RewindCalendar className={styles.RewindCalendar} />
        </Route>
        <Route path={match.path}>
          <Display3>Please select a stock to view.</Display3>
        </Route>
      </Switch>
    </ContentContainer>
  );
};

export default ViewStock;
