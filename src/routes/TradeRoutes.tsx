import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useRouteMatch, Switch, Route, useParams } from "react-router-dom";
import moment from "moment";
import { HistoricalPrice, historicalPrices } from "iex-cloud";
import { Display3 } from "baseui/dist/typography";
import ContentContainer from "templates/ContentContainer";
import ScrollToTop from "services/ScrollToTop";
import { TRADE_DATE_FORMAT } from "services/Constants";
import TradeView from "views/TradeView";
import Error from "components/BaseUI/Typography";

type Props = unknown;

const FETCH_ERROR_MESSAGE =
  "There was a problem attempting to load trading information for the stock you requested.";

const DATE_ERROR_MESSAGE =
  "There was a problem attempting to parse the date you requested.";

const TradeRoute: React.FC = () => {
  const { ticker, date } = useParams<{ ticker: string; date: string }>();
  const [prices, setPrices] = useState<Partial<HistoricalPrice>[]>();
  const [error, setError] = useState<string>("");

  const safeDate = useMemo(() => {
    const unsafeDate = moment(date, TRADE_DATE_FORMAT);
    if (unsafeDate.isValid()) {
      return unsafeDate.toDate();
    }
    setError(DATE_ERROR_MESSAGE);
  }, [date]);

  const handleLoad = useCallback(async (ticker?: string, date?: Date) => {
    if (ticker && date) {
      const immutablePrices = await historicalPrices(ticker, "max", undefined, {
        chartByDay: true,
      });
      if (!immutablePrices) {
        setError(FETCH_ERROR_MESSAGE);
      } else {
        const startDate = immutablePrices.findIndex((price) =>
          moment(price.date).isSame(date)
        );
        const endDate = startDate > -1 ? startDate - 730 : 0;
        const nextPrices = immutablePrices.slice(endDate, startDate);
        setPrices(nextPrices);
      }
    }
  }, []);

  const handleUnload = useCallback(() => {
    setPrices(undefined);
    setError("");
  }, []);

  useEffect(() => {
    handleLoad(ticker, safeDate);
    return handleUnload;
  }, [ticker, safeDate, handleLoad, handleUnload]);

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
