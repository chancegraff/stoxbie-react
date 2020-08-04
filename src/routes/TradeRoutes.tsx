import Error from "components/BaseUI/Typography";
import { parse } from "date-fns";
import { HistoricalPrice } from "iex";
import { historicalPrices } from "iex-cloud";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import {
  DATE_ERROR_MESSAGE,
  FETCH_ERROR_MESSAGE,
  TICKER_ERROR_MESSAGE,
  URL_DATE_FORMAT,
} from "services/Constants";
import ScrollToTop from "services/ScrollToTop";
import { handleUnloadCreator } from "services/Utilities";
import TradeView from "views/TradeView";

type Props = unknown;

const TradeRoute: React.FC = () => {
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
    () => {
      const parsedDate = parse(
        date,
        URL_DATE_FORMAT,
        new Date(),
      );

      if (parsedDate.getTime()) {
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

  const handleLoad = useCallback(
    async (nextTicker?: string, nextDate?: Date) => {
      if (nextTicker && nextDate) {
        const nextPrices = await historicalPrices(
          nextTicker,
          "max",
          undefined,
          {
            chartByDay: true,
          },
        );

        if (nextPrices) {
          const typedPrices = (nextPrices as unknown) as readonly HistoricalPrice[];

          setPrices(
            [
              ...typedPrices,
            ],
          );
        } else {
          setError(
            FETCH_ERROR_MESSAGE,
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
        safeDate,
      );
    },
    [
      handleLoad,
      safeTicker,
      safeDate,
    ],
  );

  useEffect(
    () => {
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
    />
  );
};

const TradeRoutes: React.FC<Props> = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:ticker/:date`}>
        <ScrollToTop />
        <TradeRoute />
      </Route>
      <Route path={`${match.path}/:ticker`}>
        <Error>
          {"Please select a date to trade from."}
        </Error>
      </Route>
      <Route path={match.path}>
        <Error>
          {"Please select a stock to trade with."}
        </Error>
      </Route>
    </Switch>
  );
};

export default TradeRoutes;
