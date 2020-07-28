import React, { useEffect, useState, useCallback } from "react";
import {
  useRouteMatch,
  Switch,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";
import {
  logo as getLogo,
  company as getCompany,
  Logo,
  Company,
} from "iex-cloud";
import Error from "components/BaseUI/Typography";
import ScrollToTop from "services/ScrollToTop";
import StockView from "views/StockView";

const ERROR_MESSAGE =
  "There was a problem attempting to load company information about the stock you requested.";

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
    setError("");
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
        <Error>Please select a stock to view.</Error>
      </Route>
    </Switch>
  );
};

export default StockRoutes;
