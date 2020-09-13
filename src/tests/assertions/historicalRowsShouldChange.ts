import {
  historicalRowShouldHaveText,
  ledgerBalanceShouldChange,
  ledgerChangeShouldChange,
} from "tests/Assertions";
import {
  TableHistoricalRows,
} from "tests/Components";
import {
  formatCount,
  formatCurrency,
  formatPercentage,
} from "utils/Utilities";

export const historicalRowsShouldChange = (
  trade: any,
) =>
{
  const tradeRows = TableHistoricalRows();

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
