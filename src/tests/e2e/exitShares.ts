import {
  waitForElement,
} from "@testing-library/react";

import {
  ledgerBalanceShouldChange,
  ledgerChangeShouldChange,
  tradeRowShouldHaveText,
} from "tests/Assertions";
import {
  ExitButtons,
  TableFooter,
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
  tradeRow?: HTMLElement,
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

  await waitForElement(
    TableFooter,
  );

  const tradeRows = TableTradeRows();

  const [
    firstTradeRow,
    secondTradeRow,
  ] = tradeRows;

  let closedRow = secondTradeRow;

  if (!secondTradeRow ||
      trade.TotalShares === 0)
  {
    closedRow = firstTradeRow;
  }

  tradeRowShouldHaveText(
    closedRow,
    formatCount(
      trade.OpenCount,
    ),
  );

  tradeRowShouldHaveText(
    closedRow,
    formatCurrency(
      trade.OpenPrice,
    ),
  );

  tradeRowShouldHaveText(
    closedRow,
    formatCurrency(
      trade.ClosePrice,
    ),
  );

  tradeRowShouldHaveText(
    closedRow,
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
