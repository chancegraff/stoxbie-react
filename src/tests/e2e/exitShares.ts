import {
  waitForElement,
} from "@testing-library/react";

import {
  historicalRowShouldHaveText,
  ledgerBalanceShouldChange,
  ledgerChangeShouldChange,
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

  historicalRowShouldHaveText(
    closedRow,
    formatCount(
      trade.OpenCount,
    ),
  );

  historicalRowShouldHaveText(
    closedRow,
    formatCurrency(
      trade.OpenPrice,
    ),
  );

  historicalRowShouldHaveText(
    closedRow,
    formatCurrency(
      trade.ClosePrice,
    ),
  );

  historicalRowShouldHaveText(
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
