import {
  buyButtonShouldChange,
} from "./buyButtonShouldChange";
import {
  sellButtonShouldChange,
} from "./sellButtonShouldChange";

export const TradeTypes = {
  Buying: "buy",
  Selling: "sell",
};

const tradeTypeShouldChange = (
  tradeType,
) =>
{
  if (tradeType === TradeTypes.Buying)
  {
    buyButtonShouldChange(
      true,
    );
    sellButtonShouldChange(
      false,
    );
  }
  else if (tradeType === TradeTypes.Selling)
  {
    buyButtonShouldChange(
      false,
    );
    sellButtonShouldChange(
      true,
    );
  }
};

export default tradeTypeShouldChange;
