import React from "react";
import {
  render,
} from "@testing-library/react";
import {
  parseISO,
} from "date-fns";

import Boilerplate from "utils/tests/Boilerplate";
import {
  DateFormats,
  formatDate,
} from "utils/Utilities";
import TradeView from "views/TradeView";

import prices, {
  getPrice,
  tradeViewStartDate,
} from "../helpers/prices";

const urlDate = formatDate(
  tradeViewStartDate,
  DateFormats.URL,
);

const dayOnePrice = getPrice(
  tradeViewStartDate,
);

const renderTradeView = () =>
{
  return render(
    (
      <Boilerplate
        path="/trade/:ticker/:date"
        route={`/trade/${dayOnePrice.symbol}/${urlDate}`}
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

export default renderTradeView;
