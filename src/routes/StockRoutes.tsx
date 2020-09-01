import React, {
  PropsHasClass,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Route,
  RouteProps,
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
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  TICKER_ERROR_MESSAGE,
} from "utils/Constants";
import {
  handleUnloadCreator,
} from "utils/Utilities";
import StockView from "views/StockView";
import PageError from "components/PageTemplates/PageError";

const ERROR_MESSAGE =
  "There was a problem attempting to load company information about the stock you requested.";

const ViewRoute: React.FC<RouteProps & PropsHasClass> = (
  {
    className,
  },
) =>
{
  const {
    ticker = "",
  } = useParams<{
    ticker: string | undefined;
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
    () =>
    {
      if (ticker)
      {
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
    ) =>
    {
      if (company)
      {
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
      nextTicker: string | undefined,
    ) =>
    {
      if (!nextTicker)
      {
        return;
      }

      const nextCompany = await getCompany(
        nextTicker,
      );
      const nextLogo = await getLogo(
        nextTicker,
      ).catch();

      if (!nextCompany ||
          !nextLogo)
      {
        setError(
          ERROR_MESSAGE,
        );
      }
      else
      {
        setLogo(
          nextLogo,
        );
        setCompany(
          nextCompany,
        );
      }
    },
    [],
  );

  useEffect(
    () =>
    {
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
    () =>
    {
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
      className={className}
      css=""
      company={company}
      error={error}
      handleStart={handleStart}
      logo={logo}
    />
  );
};

const StockRoutes: React.FC<RouteProps & PropsHasClass> = (
  {
    className,
  },
) =>
{
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:ticker`}>
        <ViewRoute
          className={className}
          css=""
        />
      </Route>
      <Route path={match.path}>
        <PageError
          className={className}
          css=""
        >
          Please select a stock to view.
        </PageError>
      </Route>
    </Switch>
  );
};

export default StockRoutes;
