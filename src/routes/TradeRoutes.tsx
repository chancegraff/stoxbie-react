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
  useParams,
  useRouteMatch,
} from "react-router-dom";
import {
  historicalPrices as fetchHistoricalPrices,
} from "@chancey/iex-cloud";
import {
  isValid,
} from "date-fns";
import {
  fromJS,
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
  DateFormats,
  handleUnloadCreator,
  parseDate,
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
    ticker = "",
    date = "",
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

  const safeDate = useMemo(
    () =>
    {
      if (!date)
      {
        setError(
          DATE_ERROR_MESSAGE,
        );

        return new Date();
      }

      if (
        !isValid(
          date,
        )
      )
      {
        setError(
          DATE_ERROR_MESSAGE,
        );

        return new Date();
      }

      return parseDate(
        date,
        DateFormats.Url,
      );
    },
    [
      date,
    ],
  );

  const safeTicker = useMemo(
    () =>
    {
      if (!ticker)
      {
        setError(
          TICKER_ERROR_MESSAGE,
        );

        return "";
      }

      return ticker;
    },
    [
      ticker,
    ],
  );

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

      const historicalPrices = fromJS(
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
          setError,
        ],
      );
    },
    [],
  );

  useScrollToTop();

  return (
    <TradeView
      css=""
      date={safeDate}
      error={error}
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
