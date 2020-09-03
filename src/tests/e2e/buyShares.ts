import {
  waitFor,
} from "@testing-library/react";

import {
  TableTradeRows,
} from "tests/Components";
import {
  changeSlider,
  clickBuy,
} from "tests/Events";
import {
  ledgerBalanceShouldChange,
  sliderShouldChange,
  tradeRowShouldHaveExitButton,
  tradeRowShouldHaveText,
  tradeRowsShouldHaveLength,
} from "tests/Assertions";
import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";

export const buyShares = async (
  trade: any,
  tradeRowsLength: number,
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

  await waitFor(
    () =>
    {
      return tradeRowsShouldHaveLength(
        tradeRows,
        tradeRowsLength,
      );
    },
  );

  const [
    openedTrade,
  ] = tradeRows;

  tradeRowShouldHaveText(
    openedTrade,
    formatCount(
      trade.CloseCount ||
      trade.TotalShares,
    ),
  );

  tradeRowShouldHaveText(
    openedTrade,
    formatCurrency(
      trade.OpenPrice,
    ),
  );

  tradeRowShouldHaveExitButton(
    openedTrade,
  );

  tradeRowShouldHaveText(
    openedTrade,
    formatCurrency(
      trade.TotalEquity ||
      trade.OpenCount * trade.OpenPrice,
    ),
  );

  ledgerBalanceShouldChange(
    formatCurrency(
      trade.LedgerBalance,
    ),
  );
};
