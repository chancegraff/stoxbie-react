import React from "react";
import {
  RouteProps,
} from "react-router-dom";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";
import useResizeObserver from "use-resize-observer";

import TradeViewDisplay from "./TradeViewDisplay";

type Props = RouteProps & {
  date: Date | undefined;
  prices: HistoricalPrice[] | undefined;
  ticker: string | undefined;
  error?: string;
};

const TradeViewLogic: React.FC<Props> = (
  {
    prices,
    date,
    error,
    ticker,
  },
) =>
{
  const {
    ref: aspectRatioRef,
    width: chartWidth = 1,
    height: chartHeight = 1,
  } = useResizeObserver();

  return null;
};

export default TradeViewLogic;
