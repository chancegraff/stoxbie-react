import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  useRouteMatch,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { historicalPrices } from "iex-cloud";
import { HistoricalPrice } from "iex";
import { parse } from "date-fns";
import ScrollToTop from "services/ScrollToTop";
import { handleUnloadCreator } from "services/Utilities";
import {
  URL_DATE_FORMAT,
  FETCH_ERROR_MESSAGE,
  DATE_ERROR_MESSAGE,
  TICKER_ERROR_MESSAGE,
} from "services/Constants";
import TradeView from "views/TradeView";
import Error from "components/BaseUI/Typography";

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
  ] = useState<
    HistoricalPrice[]
  >();
  const [
    error,
    setError,
  ] = useState<
    string
  >();

  const safeDate = useMemo(() => {
    const parsedDate = parse(
      date,
      URL_DATE_FORMAT,
      new Date()
    );
    if (
      parsedDate.getTime()
    ) {
      return parsedDate;
    }
    setError(
      DATE_ERROR_MESSAGE
    );
  }, [
    date,
  ]);

  const safeTicker = useMemo(() => {
    if (
      ticker
    ) {
      return ticker;
    }
    setError(
      TICKER_ERROR_MESSAGE
    );
  }, [
    ticker,
  ]);

  const handleLoad = useCallback(
    async (
      ticker?: string,
      date?: Date
    ) => {
      if (
        ticker &&
        date
      ) {
        const nextPrices = await historicalPrices(
          ticker,
          "max",
          undefined,
          {
            chartByDay: true,
          }
        );
        if (
          !nextPrices
        ) {
          setError(
            FETCH_ERROR_MESSAGE
          );
        } else {
          const typedPrices = (nextPrices as unknown) as readonly HistoricalPrice[];
          setPrices(
            [
              ...typedPrices,
            ]
          );
        }
      }
    },
    []
  );

  useEffect(() => {
    handleLoad(
      safeTicker,
      safeDate
    );
  }, [
    handleLoad,
    safeTicker,
    safeDate,
  ]);

  useEffect(
    () =>
      handleUnloadCreator(
        [
          setPrices,
          setError,
        ]
      ),
    []
  );

  return (
    <TradeView
      prices={
        prices
      }
      date={
        safeDate
      }
      error={
        error
      }
    />
  );
};

const TradeRoutes: React.FC<Props> = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route
        path={`${match.path}/:ticker/:date`}
      >
        <ScrollToTop />
        <TradeRoute />
      </Route>
      <Route
        path={`${match.path}/:ticker`}
      >
        <Error>
          {`Please select a date to trade from.`}
        </Error>
      </Route>
      <Route
        path={
          match.path
        }
      >
        <Error>
          {`Please select a stock to trade with.`}
        </Error>
      </Route>
    </Switch>
  );
};

export default TradeRoutes;
