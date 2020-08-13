import {
  waitFor,
} from "@testing-library/react";

import {
  formatCurrency,
  formatPercentage,
} from "utils/Utilities";

import {
  ledgerBalanceShouldChange,
  ledgerChangeShouldChange,
  sliderShouldChange,
  tradeRowShouldHaveText,
  tradeRowsShouldHaveLength,
} from "./assertions";
import {
  TableTradeRows,
} from "./components";
import {
  changeSlider,
  clickSell,
} from "./events";

export const shouldSellShares = async (
  trade,
  tradeRowsLength,
) =>
{
  changeSlider(
    trade.CloseCount,
  );

  await waitFor(
    () =>
    {
      return sliderShouldChange(
        `${trade.CloseCount}`,
      );
    },
  );

  clickSell();

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
    firstTradeRow,
    secondTradeRow,
  ] = tradeRows;

  const tradeRow = secondTradeRow || firstTradeRow;

  tradeRowShouldHaveText(
    tradeRow,
    formatCurrency(
      trade.OpenPrice,
    ),
  );

  tradeRowShouldHaveText(
    tradeRow,
    formatCurrency(
      trade.ClosePrice,
    ),
  );

  tradeRowShouldHaveText(
    tradeRow,
    formatPercentage(
      trade.ChangePercent,
    ),
  );

  tradeRowShouldHaveText(
    tradeRow,
    formatCurrency(
      trade.ChangeBalance,
    ),
  );

  ledgerBalanceShouldChange(
    formatCurrency(
      trade.LedgerBalance,
    ),
  );

  ledgerChangeShouldChange(
    formatPercentage(
      trade.LedgerChange,
    ),
  );

  return {
    ...trade,
  };
};
