import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  RouteProps,
  useParams,
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
  useError,
  useScrollToTop,
} from "utils/Hooks";
import {
  handleUnloadCreator,
} from "utils/Utilities";
import {
  historicalPricesState,
} from "store/Atoms";

import TradeViewLogic from "./TradeView/TradeViewLogic";

type Props = RouteProps;

const TradeView: React.FC<Props> = () =>
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

  useError(
    error,
  );

  return (
    <TradeViewLogic
      date={date}
    />
  );
};

export default TradeView;
