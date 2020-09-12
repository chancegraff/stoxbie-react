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

  await waitFor(
    () =>
    {
      return sliderShouldChange(
        `${trade.OpenCount}`,
      );
    },
  );

  clickOrder();

  await waitFor(
    () =>
    {
      return sliderShouldChange(
        "0",
      );
    },
  );

  const tradeRows = TableTradeRows();

  await waitForElement(
    TableFooter,
  );

  const [
    openedTrade,
  ] = tradeRows;

  tradeRowShouldHaveText(
    openedTrade,
    formatCount(
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
      trade.OpenCount * trade.OpenPrice,
    ),
  );

  ledgerBalanceShouldChange(
    formatCurrency(
      trade.LedgerBalance,
    ),
  );
};
