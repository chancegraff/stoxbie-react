import {
  waitFor,
} from "@testing-library/react";

import {
  formatCurrency,
} from "utils/Utilities";
import ledgerBalanceShouldChange from "views/tests/assertions/ledgerBalanceShouldChange";
import sliderShouldChange from "views/tests/assertions/sliderShouldChange";
import tradeRowShouldHaveExitButton from "views/tests/assertions/tradeRowShouldHaveExitButton";
import tradeRowShouldHaveText from "views/tests/assertions/tradeRowShouldHaveText";
import tradeRowsShouldHaveLength from "views/tests/assertions/tradeRowsShouldHaveLength";
import TableTradeRows from "views/tests/elements/TableTradeRows";
import changeSlider from "views/tests/events/changeSlider";
import clickBuy from "views/tests/events/clickBuy";

export const shouldBuyShares = async (
  trade,
  tradeRowsLength,
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

  clickBuy();

  await waitFor(
    () =>
    {
      return sliderShouldChange(
        "0",
      );
    },
  );

  const tradeRows = TableTradeRows();

  tradeRowsShouldHaveLength(
    tradeRows,
    tradeRowsLength,
  );

  const [
    openedTrade,
  ] = tradeRows;

  tradeRowShouldHaveText(
    openedTrade,
    formatCurrency(
      trade.OpenPrice,
    ),
  );

  tradeRowShouldHaveExitButton(
    openedTrade,
  );

  ledgerBalanceShouldChange(
    formatCurrency(
      trade.LedgerBalance,
    ),
  );
};
