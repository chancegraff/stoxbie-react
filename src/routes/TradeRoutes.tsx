import React, {
  useCallback, useEffect, useMemo, useState,
} from "react";
import {
  Route, Switch, useParams, useRouteMatch,
} from "react-router-dom";
import { parse } from "date-fns";
import { HistoricalPrice } from "iex";
import { historicalPrices } from "iex-cloud";

import {
  DATE_ERROR_MESSAGE,
  FETCH_ERROR_MESSAGE,
  TICKER_ERROR_MESSAGE,
  URL_DATE_FORMAT,
} from "services/Constants";
import ScrollToTop from "services/ScrollToTop";
import { handleUnloadCreator } from "services/Utilities";
import PageError from "templates/PageError";
import TradeView from "views/TradeView";

type Props = unknown;

const TradeRoute: React.FC = () =>
{
  const {
    ticker = "",
    date = "",
  } = useParams<{
    ticker?: string;
    date?: string;
  }>();
  const [
    prices,
    setPrices,
  ] = useState<HistoricalPrice[]>();
  const [
    error,
    setError,
  ] = useState<string>();

  const safeDate = useMemo(
    () =>
    {
      const parsedDate = parse(
        date,
        URL_DATE_FORMAT,
        new Date(),
      );

      if (parsedDate.getTime())
      {
        return parsedDate;
      }
      setError(DATE_ERROR_MESSAGE);
    },
    [ date ],
  );

  const safeTicker = useMemo(
    () =>
    {
      if (ticker)
      {
        return ticker;
      }
      setError(TICKER_ERROR_MESSAGE);
    },
    [ ticker ],
  );

  const handleLoad = useCallback(
    async (
      nextTicker?: string,
    ) =>
    {
      if (nextTicker)
      {
        const nextPrices = await historicalPrices(
          nextTicker,
          "max",
          undefined,
          { chartByDay: true },
        );

        if (nextPrices)
        {
          const typedPrices = (nextPrices as unknown) as readonly HistoricalPrice[];

          setPrices([ ...typedPrices ]);
        }
        else
        {
          setError(FETCH_ERROR_MESSAGE);
        }
      }
    },
    [],
  );

  useEffect(
    () =>
    {
      handleLoad(safeTicker);
    },
    [
      handleLoad,
      safeTicker,
    ],
  );

  useEffect(
    () =>
    {
      return handleUnloadCreator([
        setPrices,
        setError,
      ]);
    },
    [],
  );

  return (
    <TradeView
      date={safeDate}
      error={error}
      prices={prices}
      ticker={safeTicker}
    />
  );
};

const TradeRoutes: React.FC<Props> = () =>
{
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:ticker/:date`}>
        <ScrollToTop />
        <TradeRoute />
      </Route>
      <Route path={`${match.path}/:ticker`}>
        <PageError>
          Please select a date to trade from.
        </PageError>
      </Route>
      <Route path={match.path}>
        <PageError>
          Please select a stock to trade with.
        </PageError>
      </Route>
    </Switch>
  );
};

export default TradeRoutes;
