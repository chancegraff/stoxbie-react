import {
  waitFor,
} from "@testing-library/react";

import {
  TableTradeRows,
} from "utils/Components";
import {
  changeSlider,
  clickSell,
} from "utils/Events";
import {
  ledgerBalanceShouldChange,
  ledgerChangeShouldChange,
  sliderShouldChange,
  tradeRowShouldHaveText,
  tradeRowsShouldHaveLength,
} from "utils/Assertions";
import {
  formatCount,
  formatCurrency,
  formatPercentage,
} from "utils/Utilities";

export const sellShares = async (
  trade: any,
  tradeRowsLength: number,
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
    firstTradeRow,
    secondTradeRow,
  ] = tradeRows;

  let tradeRow = secondTradeRow;

  if (!secondTradeRow ||
      trade.TotalShares === 0)
  {
    tradeRow = firstTradeRow;
  }

  tradeRowShouldHaveText(
    tradeRow,
    formatCount(
      trade.CloseCount,
    ),
  );

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
    formatCurrency(
      trade.CloseCount * trade.ClosePrice,
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
};
