import {
  TradeTypes,
  tradeTypeShouldChange,
} from "utils/Assertions";
import {
  clickBuy,
  clickSell,
} from "utils/Events";
import {
  renderTradeView,
} from "utils/Renderers";

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
