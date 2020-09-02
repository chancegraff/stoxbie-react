import {
  TradeTypes,
  tradeTypeShouldChange,
} from "utils/tests/Assertions";
import {
  clickBuy,
  clickSell,
} from "utils/tests/Events";
import {
  renderTradeView,
} from "utils/tests/Renderers";

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
