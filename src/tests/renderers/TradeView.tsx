import React from "react";
import {
  render,
} from "@testing-library/react";

import Boilerplate from "tests/Boilerplate";
import {
  getPrice,
  tradeViewStartDate,
} from "tests/Helpers";
import {
  ROUTE_ORDER,
} from "utils/Constants";
import {
  DateFormat,
  formatDate,
} from "utils/Utilities";
import TradeView from "views/TradeView";

const urlDate = formatDate(
  tradeViewStartDate,
  DateFormat.Url,
);

const dayOnePrice = getPrice(
  tradeViewStartDate,
);

export const renderTradeView = () =>
{
  return render(
    (
      <Boilerplate
        path={`${ROUTE_ORDER}/:ticker/:date`}
        route={`${ROUTE_ORDER}/${dayOnePrice.symbol}/${urlDate}`}
      >
        <TradeView />
      </Boilerplate>
    ),
  );
};
