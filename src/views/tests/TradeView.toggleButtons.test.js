import tradeTypeShouldChange, {
  TradeTypes,
} from "./assertions/tradeTypeShouldChange";
import clickBuy from "./events/clickBuy";
import clickSell from "./events/clickSell";
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
