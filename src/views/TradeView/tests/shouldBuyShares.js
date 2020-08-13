import {
  waitFor,
} from "@testing-library/react";

import {
  formatCurrency,
} from "utils/Utilities";

import {
  ledgerBalanceShouldChange,
  sliderShouldChange,
  tradeRowShouldHaveExitButton,
  tradeRowShouldHaveText,
  tradeRowsShouldHaveLength,
} from "./assertions";
import {
  TableTradeRows,
} from "./components";
import {
  changeSlider,
  clickBuy,
} from "./events";

export const shouldBuyShares = async (
  trade,
  tradeRowsLength,
) =>
{
  changeSlider(
    trade.OpenCount,
  );

  await waitFor(
    () =>
    {
      return sliderShouldChange(
        `${trade.OpenCount}`,
      );
    },
  );

  clickBuy();

  await waitFor(
    () =>
    {
      return sliderShouldChange(
        "0",
      );
    },
  );

  const tradeRows = TableTradeRows();

  tradeRowsShouldHaveLength(
    tradeRows,
    tradeRowsLength,
  );

  const [
    openedTrade,
  ] = tradeRows;

  tradeRowShouldHaveText(
    openedTrade,
    formatCurrency(
      trade.OpenPrice,
    ),
  );

  tradeRowShouldHaveExitButton(
    openedTrade,
  );

  ledgerBalanceShouldChange(
    formatCurrency(
      trade.LedgerBalance,
    ),
  );
};
