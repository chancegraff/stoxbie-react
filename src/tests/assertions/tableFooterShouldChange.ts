import {
  ledgerBalanceShouldChange,
  ledgerChangeShouldChange,
} from "tests/Assertions";
import {
  formatCurrency,
  formatPercentage,
} from "utils/Utilities";

export const tableFooterShouldChange = (
  trade: any,
) =>
{
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
