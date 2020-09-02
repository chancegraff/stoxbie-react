import {
  buyButtonShouldChange,
  sellButtonShouldChange,
} from "utils/tests/Assertions";

export enum TradeTypes {
  Buying = "buy",
  Selling = "sell",
}

export const tradeTypeShouldChange = (
  tradeType: TradeTypes,
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
