import {
  prettyDOM,
} from "@testing-library/react";

import {
  TradeTypes,
  tradeTypeShouldChange,
} from "./helpers/assertions";
import {
  BuyButton,
} from "./helpers/components";
import {
  clickBuy,
  clickSell,
} from "./helpers/events";
import {
  renderTradeView,
} from "./helpers/render";

it(
  "toggles trade buttons",
  () =>
  {
    renderTradeView();

    tradeTypeShouldChange(
      TradeTypes.Buying,
    );

    clickSell();

    tradeTypeShouldChange(
      TradeTypes.Selling,
    );

    clickBuy();

    tradeTypeShouldChange(
      TradeTypes.Buying,
    );
  },
);
