import tradeTypeShouldChange, {
  TradeTypes,
} from "./assertions/tradeTypeShouldChange";
import clickBuy from "./events/clickBuy";
import clickSell from "./events/clickSell";
import render from "./render/TradeView";

it(
  "toggles trade buttons",
  () =>
  {
    render();

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
