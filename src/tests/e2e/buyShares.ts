import {
  waitForElement,
} from "@testing-library/react";

import {
  ledgerBalanceShouldChange,
  presentRowShouldHaveCloseButton,
  presentRowShouldHaveText,
  sliderShouldChange,
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

  presentRowShouldHaveText(
    openedTrade,
    formatCount(
      trade.TotalCount ||
      trade.OpenCount,
    ),
  );

  presentRowShouldHaveText(
    openedTrade,
    formatCurrency(
      trade.OpenPrice,
    ),
  );

  presentRowShouldHaveCloseButton(
    openedTrade,
  );

  presentRowShouldHaveText(
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
