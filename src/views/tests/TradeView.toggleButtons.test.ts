import {
  TradeTypes,
  tradeTypeShouldChange,
} from "tests/Assertions";
import {
  clickBuy,
  clickSell,
} from "tests/Events";
import {
  renderTradeView,
} from "tests/Renderers";

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
