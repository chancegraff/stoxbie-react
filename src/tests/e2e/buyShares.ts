import {
  waitFor,
  waitForElement,
} from "@testing-library/react";

import {
  ledgerBalanceShouldChange,
  sliderShouldChange,
  tradeRowShouldHaveExitButton,
  tradeRowShouldHaveText,
} from "tests/Assertions";
import {
  TableFooter,
  TableTradeRows,
} from "tests/Components";
import {
  changeSlider,
  clickOrder,
} from "tests/Events";
import {
  formatCount,
  formatCurrency,
} from "utils/Utilities";

export const buyShares = async (
  trade: any,
) =>
{
  changeSlider(
    trade.OpenCount,
  );

  sliderShouldChange(
    `${trade.OpenCount}`,
  );

  clickOrder();

  sliderShouldChange(
    "0",
  );

  await waitForElement(
    TableFooter,
  );

  const tradeRows = TableTradeRows();

  const [
    openedTrade,
  ] = tradeRows;

  tradeRowShouldHaveText(
    openedTrade,
    formatCount(
      trade.TotalCount ||
      trade.OpenCount,
    ),
  );

  tradeRowShouldHaveText(
    openedTrade,
    formatCurrency(
      trade.OpenPrice,
    ),
  );

  tradeRowShouldHaveExitButton(
    openedTrade,
  );

  tradeRowShouldHaveText(
    openedTrade,
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
