import React, { useEffect, useState, useCallback } from "react";
import {
  useRouteMatch,
  Switch,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";
import { Display3 } from "baseui/dist/typography";
import {
  logo as getLogo,
  company as getCompany,
  Logo,
  Company,
} from "iex-cloud";
import ScrollToTop from "services/ScrollToTop";
import StockView from "views/StockView";
import ContentContainer from "templates/ContentContainer";

const ERROR_MESSAGE =
  "There was a problem attempting to load the stock you requested.";

const ViewRoute: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const history = useHistory();

  const [logo, setLogo] = useState<Logo>();
  const [company, setCompany] = useState<Company>();
  const [error, setError] = useState<string>("");

  const handleStart = useCallback(
    (date: string) => {
      if (company) {
        history.push(`/trade/${company.symbol}/${date}`);
      }
    },
    [history, company]
  );

  const handleLoad = useCallback(async (ticker: string) => {
    if (ticker) {
      const nextCompany = await getCompany(ticker);
      const nextLogo = await getLogo(ticker).catch();
      if (!nextCompany || !nextLogo) {
        setError(ERROR_MESSAGE);
      } else {
        setLogo(nextLogo);
        setCompany(nextCompany);
      }
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
    <StockView
      logo={logo}
      company={company}
      error={error}
      handleStart={handleStart}
    />
  );
};

const StockRoutes: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:ticker`}>
        <ScrollToTop />
        <ViewRoute />
      </Route>
      <Route path={match.path}>
        <ScrollToTop />
        <ContentContainer>
          <Display3>Please select a stock to view.</Display3>
        </ContentContainer>
      </Route>
    </Switch>
  );
};

export default StockRoutes;
