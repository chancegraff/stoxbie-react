import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Route, RouteProps,
  Switch, useParams, useRouteMatch,
} from "react-router-dom";
import {
  HistoricalPrice,
  historicalPrices,
} from "iex-cloud";

import {
  DATE_ERROR_MESSAGE,
  FETCH_ERROR_MESSAGE,
  TICKER_ERROR_MESSAGE,
} from "utils/Constants";
import {
  DateFormats,
  handleUnloadCreator,
  parseDate,
} from "utils/Utilities";
import TradeView from "views/TradeView";
import PageError from "components/PageTemplates/PageError";
import PageScrollToTop from "components/PageTemplates/PageScrollToTop";

// import defPrices from "../views/TradeView/tests/prices";

type Props = RouteProps;

const TradeRoute: React.FC<RouteProps> = () =>
{
  const {
    ticker = "",
    date = "",
  } = useParams<{
    ticker: string | undefined;
    date: string | undefined;
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
      const parsedDate = parseDate(
        date,
        DateFormats.URL,
      );

      if (parsedDate.getTime())
      {
        return parsedDate;
      }
      setError(
        DATE_ERROR_MESSAGE,
      );
    },
    [
      date,
    ],
  );

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

  const handleLoad = useCallback(
    async (
      nextTicker: string | undefined,
    ) =>
    {
      if (nextTicker)
      {
        const nextPrices = await historicalPrices(
          nextTicker,
          "max",
          undefined,
          {
            chartByDay: true,
          },
        );

        if (nextPrices)
        {
          const typedPrices = (nextPrices as unknown) as readonly HistoricalPrice[];

          setPrices(
            [
              ...typedPrices,
            ],
          );
        }
        else
        {
          setError(
            FETCH_ERROR_MESSAGE,
          );
        }
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
          setPrices,
          setError,
        ],
      );
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
        <PageScrollToTop />
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
