import {
  waitFor,
} from "@testing-library/react";

import {
  ledgerBalanceShouldChange,
  ledgerChangeShouldChange,
  tradeRowShouldHaveText,
  tradeRowsShouldHaveLength,
} from "tests/Assertions";
import {
  ExitButtons,
  TablePresentBody,
  TableTradeRows,
} from "tests/Components";
import {
  clickExit,
} from "tests/events/clickExit";
import {
  formatCount,
  formatCurrency,
  formatPercentage,
} from "utils/Utilities";

export const exitShares = async (
  trade: any,
  tradeRowsLength: number,
) =>
{
  const presentBody = TablePresentBody();

  const [
    exitButton,
  ] = ExitButtons(
    presentBody,
  );

  clickExit(
    exitButton,
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
      trade.OpenCount,
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
