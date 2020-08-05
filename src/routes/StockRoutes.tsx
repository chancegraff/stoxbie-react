import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import {
  Company,
  company as getCompany,
  Logo,
  logo as getLogo,
} from "iex-cloud";

import { TICKER_ERROR_MESSAGE } from "services/Constants";
import ScrollToTop from "services/ScrollToTop";
import { handleUnloadCreator } from "services/Utilities";
import StockView from "views/StockView";
import Error from "components/BaseUI/Typography";

const ERROR_MESSAGE =
  "There was a problem attempting to load company information about the stock you requested.";

const ViewRoute: React.FC = () => {
  const {
    ticker = "",
  } = useParams<{
    ticker?: string;
  }>();
  const history = useHistory();

  const [
    logo,
    setLogo,
  ] = useState<Logo>();
  const [
    company,
    setCompany,
  ] = useState<Company>();
  const [
    error,
    setError,
  ] = useState<string>();

  const safeTicker = useMemo(
    () => {
      if (ticker) {
        return ticker;
      }
      setError(
        TICKER_ERROR_MESSAGE,
      );
    },
    [
      ticker,
    ],
  );

  const handleStart = useCallback(
    (
      date: string,
    ) => {
      if (company) {
        history.push(
          `/trade/${company.symbol}/${date}`,
        );
      }
    },
    [
      history,
      company,
    ],
  );

  const handleLoad = useCallback(
    async (
      nextTicker?: string,
    ) => {
      if (nextTicker) {
        const nextCompany = await getCompany(
          nextTicker,
        );
        const nextLogo = await getLogo(
          nextTicker,
        ).catch();

        if (!nextCompany || !nextLogo) {
          setError(
            ERROR_MESSAGE,
          );
        } else {
          setLogo(
            nextLogo,
          );
          setCompany(
            nextCompany,
          );
        }
      }
    },
    [],
  );

  useEffect(
    () => {
      handleLoad(
        safeTicker,
      );
    },
    [
      handleLoad,
      safeTicker,
    ],
  );

  useEffect(
    () => {
      return handleUnloadCreator(
        [
          setLogo,
          setCompany,
          setError,
        ],
      );
    },
    [],
  );

  return (
    <StockView
      company={company}
      error={error}
      handleStart={handleStart}
      logo={logo}
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
        <Error>
          Please select a stock to view.
        </Error>
      </Route>
    </Switch>
  );
};

export default StockRoutes;
