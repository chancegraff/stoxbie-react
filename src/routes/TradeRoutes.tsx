import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useRouteMatch, Switch, Route, useParams } from "react-router-dom";
import { historicalPrices } from "iex-cloud";
import { HistoricalPrice } from "iex";
import { isSameDay, parse } from "date-fns";
import ScrollToTop from "services/ScrollToTop";
import {
  IEX_DATE_FORMAT,
  URL_DATE_FORMAT,
  FETCH_ERROR_MESSAGE,
  DATE_ERROR_MESSAGE,
  TICKER_ERROR_MESSAGE,
} from "services/Constants";
import TradeView from "views/TradeView";
import Error from "components/BaseUI/Typography";

type Props = unknown;

const TradeRoute: React.FC = () => {
  const { ticker, date } = useParams<{ ticker: string; date: string }>();
  const [prices, setPrices] = useState<HistoricalPrice[]>();
  const [error, setError] = useState<string>("");

  const safeDate = useMemo(() => {
    const unsafeDate = parse(date, URL_DATE_FORMAT, new Date());
    if (unsafeDate.getTime()) {
      return unsafeDate;
    }
    setError(DATE_ERROR_MESSAGE);
  }, [date]);

  const safeTicker = useMemo(() => {
    if (ticker) {
      return ticker;
    }
    setError(TICKER_ERROR_MESSAGE);
  }, [ticker]);

  const handleLoad = useCallback(async (ticker?: string, date?: Date) => {
    if (ticker && date) {
      const pricesWithBadTypes = await historicalPrices(
        ticker,
        "max",
        undefined,
        {
          chartByDay: true,
        }
      );
      if (!pricesWithBadTypes) {
        setError(FETCH_ERROR_MESSAGE);
      } else {
        const [
          ...prices
        ] = (pricesWithBadTypes as unknown) as readonly HistoricalPrice[];
        const startDate = prices.findIndex((price) => {
          const priceDate = parse(price.date, IEX_DATE_FORMAT, new Date());
          return isSameDay(priceDate, date);
        });
        const endDate = startDate > -1 ? startDate - 730 : 0;
        const nextPrices = prices.slice(endDate, startDate);
        setPrices(nextPrices);
      }
    }
  }, []);

  const handleUnload = useCallback(() => {
    setPrices(undefined);
    setError("");
  }, []);

  useEffect(() => {
    handleLoad(safeTicker, safeDate);
    return handleUnload;
  }, [safeTicker, safeDate, handleLoad, handleUnload]);

  return <TradeView prices={prices} error={error} />;
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
        <Error>Please select a date to trade from.</Error>
      </Route>
      <Route path={match.path}>
        <Error>Please select a stock to trade with.</Error>
      </Route>
    </Switch>
  );
};

export default TradeRoutes;
