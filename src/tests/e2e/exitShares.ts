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
  TableHistoricalBody,
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
  presentRow?: HTMLElement,
) =>
{
  let buttonContainer = presentRow;

  if (!buttonContainer)
  {
    buttonContainer = TablePresentBody();
  }

  const [
    exitButton,
  ] = ExitButtons(
    buttonContainer,
  );

  clickExit(
    exitButton,
  );

  const historicalBody = TableHistoricalBody();
  const tradeRows = TableTradeRows(
    historicalBody,
  );

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

  await waitForElement(
    TableFooter,
  );

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
