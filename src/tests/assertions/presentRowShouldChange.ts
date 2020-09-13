import {
  ledgerBalanceShouldChange,
  presentRowShouldHaveCloseButton,
  presentRowShouldHaveText,
} from "tests/Assertions";
import {
  TablePresentRow,
} from "tests/Components";
import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";

export const presentRowShouldChange = (
  trade: any,
) =>
{
  const presentRow = TablePresentRow();

  presentRowShouldHaveText(
    presentRow,
    formatCount(
      trade.TotalCount,
    ),
  );

  presentRowShouldHaveText(
    presentRow,
    formatCurrency(
      trade.TotalPrice,
    ),
  );

  presentRowShouldHaveCloseButton(
    presentRow,
  );

  presentRowShouldHaveText(
    presentRow,
    formatCurrency(
      trade.TotalBalance ||
      trade.OpenCount * trade.OpenPrice,
    ),
  );

  ledgerBalanceShouldChange(
    formatCurrency(
      trade.LedgerBalance,
    ),
  );
};
