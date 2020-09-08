import React, {
  PropsHasClass,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Route,
  RouteProps,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import {
  historicalPrices as fetchHistoricalPrices,
} from "@chancey/iex-cloud";
import {
  List,
} from "immutable";
import {
  useSetRecoilState,
} from "recoil";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  DATE_ERROR_MESSAGE,
  FETCH_ERROR_MESSAGE,
  TICKER_ERROR_MESSAGE,
} from "utils/Constants";
import {
  useScrollToTop,
} from "utils/Hooks";
import {
  handleUnloadCreator,
} from "utils/Utilities";
import {
  historicalPricesState,
} from "store/Atoms";
import TradeView from "views/TradeView";
import PageError from "components/PageTemplates/PageError";

type Props = RouteProps & PropsHasClass;

const TradeRoute: React.FC<Props> = () =>
{
  const {
    ticker,
    date,
  } = useParams<{
    ticker: string | undefined;
    date: string | undefined;
  }>();
  const setHistoricalPrices = useSetRecoilState(
    historicalPricesState,
  );
  const [
    error,
    setError,
  ] = useState<string>();

  const handleLoad = useCallback(
    async (
      nextTicker: string,
    ) =>
    {
      const awaitedPrices = await fetchHistoricalPrices(
        nextTicker,
        "max",
        undefined,
        {
          chartByDay: true,
        },
      );

      if (!awaitedPrices)
      {
        setError(
          FETCH_ERROR_MESSAGE,
        );

        return;
      }

      const historicalPrices = List(
        awaitedPrices,
      );

      setHistoricalPrices(
        historicalPrices,
      );
    },
    [
      setHistoricalPrices,
    ],
  );

  useEffect(
    () =>
    {
      if (!ticker)
      {
        return;
      }

      handleLoad(
        ticker,
      );
    },
    [
      handleLoad,
      ticker,
    ],
  );

  useEffect(
    () =>
    {
      return handleUnloadCreator(
        [
          setError,
        ],
      );
    },
    [],
  );

  useScrollToTop();

  if (!date)
  {
    setError(
      DATE_ERROR_MESSAGE,
    );
  }

  if (!ticker)
  {
    setError(
      TICKER_ERROR_MESSAGE,
    );
  }

  return (
    <TradeView
      css=""
      date={date}
      error={error}
      ticker={ticker}
    />
  );
};

const TradeRoutes: React.FC<Props> = () =>
{
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:ticker/:date`}>
        <TradeRoute css="" />
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
