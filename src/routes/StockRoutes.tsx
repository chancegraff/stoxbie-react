import React, { useEffect, useState, useCallback } from "react";
import { useRouteMatch, Switch, Route, useParams } from "react-router-dom";
import { Display3 } from "baseui/dist/typography";
import {
  logo as getLogo,
  company as getCompany,
  Logo,
  Company,
} from "iex-cloud";
import ScrollToTop from "services/ScrollToTop";
import ContentContainer from "templates/ContentContainer";
import StockView from "views/StockView";

type Props = unknown;

const StockRoutes: React.FC<Props> = () => {
  const match = useRouteMatch();
  const { ticker } = useParams();

  const [logo, setLogo] = useState<Logo>();
  const [company, setCompany] = useState<Company>();
  const [error, setError] = useState<string>("");

  const handleLoad = useCallback(async (ticker: string) => {
    try {
      const nextCompany = await getCompany(ticker);
      const nextLogo = await getLogo(ticker);
      setLogo(nextLogo);
      setCompany(nextCompany);
    } catch (e) {
      setError(e.toString());
    }
  }, []);

  const handleUnload = useCallback(() => {
    setLogo(undefined);
    setCompany(undefined);
  }, []);

  useEffect(() => {
    handleLoad(ticker);
    return handleUnload;
  }, [ticker, handleLoad, handleUnload]);

  return (
    <ContentContainer>
      <Switch>
        <Route path={`${match.path}/:ticker`}>
          <ScrollToTop />
          <StockView logo={logo} company={company} error={error} />
        </Route>
        <Route path={match.path}>
          <ScrollToTop />
          <Display3>Please select a stock to view.</Display3>
        </Route>
      </Switch>
    </ContentContainer>
  );
};

export default StockRoutes;
