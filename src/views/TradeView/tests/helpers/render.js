import React from "react";
import {
  render,
} from "@testing-library/react";
import {
  parseISO,
} from "date-fns";

import Boilerplate from "utils/tests/Boilerplate";
import TradeView from "views/TradeView";

import {
  urlStartDate,
} from "./constants";
import prices, {
  dayOnePrice,
} from "./prices";

export const renderView = () =>
{
  return render(
    (
      <Boilerplate
        path="/trade/:ticker/:date"
        route={`/trade/${dayOnePrice.symbol}/${urlStartDate}`}
      >
        <TradeView
          date={
            parseISO(
              dayOnePrice.date,
            )
          }
          prices={prices}
          ticker={dayOnePrice.symbol}
        />
      </Boilerplate>
    ),
  );
};
