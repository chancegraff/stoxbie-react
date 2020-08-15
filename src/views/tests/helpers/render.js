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
import SearchView from "views/SearchView";
import TradeView from "views/TradeView";

import {
  startDate,
} from "./constants";
import prices, {
  getPrice,
} from "./prices";

const urlDate = formatDate(
  startDate,
  DateFormats.URL,
);

const dayOnePrice = getPrice(
  startDate,
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

export const renderSearchView = (
  props,
) =>
{
  return render(
    <Boilerplate>
      <SearchView {...props} />
    </Boilerplate>,
  );
};
