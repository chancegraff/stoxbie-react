import React from "react";
import {
  render,
} from "@testing-library/react";
import {
  parseISO,
} from "date-fns";

import {
  Boilerplate,
} from "utils/tests";
import {
  getPrice,
  prices,
  tradeViewStartDate,
} from "utils/tests/Helpers";
import {
  DateFormats,
  formatDate,
} from "utils/Utilities";
import TradeView from "views/TradeView";

const urlDate = formatDate(
  tradeViewStartDate,
  DateFormats.Url,
);

const dayOnePrice = getPrice(
  tradeViewStartDate,
);

export const renderTradeView = () =>
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
