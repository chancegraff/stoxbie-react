import {
  waitFor,
} from "@testing-library/react";

import {
  formatCount,
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

const buyShares = async (
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
    formatCount(
      trade.CloseCount ||
      trade.TotalShares,
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
      trade.TotalEquity ||
      trade.OpenCount * trade.OpenPrice,
    ),
  );

  ledgerBalanceShouldChange(
    formatCurrency(
      trade.LedgerBalance,
    ),
  );
};

export default buyShares;
