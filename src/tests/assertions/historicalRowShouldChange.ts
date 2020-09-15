import {
  historicalRowShouldHaveText,
} from "tests/Assertions";
import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";

export const historicalRowShouldChange = (
  historicalRow: HTMLElement,
  trade: any,
) =>
{
  historicalRowShouldHaveText(
    historicalRow,
    formatCount(
      trade.OpenCount,
    ),
  );

  historicalRowShouldHaveText(
    historicalRow,
    formatCurrency(
      trade.OpenPrice,
    ),
  );

  historicalRowShouldHaveText(
    historicalRow,
    formatCurrency(
      trade.ClosePrice,
    ),
  );

  historicalRowShouldHaveText(
    historicalRow,
    formatCurrency(
      trade.CloseCount * trade.ClosePrice,
    ),
  );
};
