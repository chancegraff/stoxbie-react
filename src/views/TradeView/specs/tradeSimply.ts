import {
  addBusinessDays,
} from "date-fns";

import {
  buyShares,
  exitShares,
} from "tests/E2E";
import {
  clickContinue,
} from "tests/Events";
import {
  getPriceRange,
  tradeViewStartDate,
} from "tests/Helpers";
import {
  renderTradeView,
} from "tests/Renderers";

const [
  dayOnePrice,
  dayTwoPrice,
] = getPriceRange(
  tradeViewStartDate,
  addBusinessDays(
    tradeViewStartDate,
    1,
  ),
);

const initialLedgerBalance = 10000;

const openShares = 200;
const openPrice = dayOnePrice.close;
const openEquity = openPrice * openShares;
const openBalance = initialLedgerBalance - openEquity;

const closePrice = dayTwoPrice.close;
const closeEquity = closePrice * openShares;
const closeBalance = openBalance + closeEquity;

const equityChange = closeEquity - openEquity;
const ledgerChange = equityChange / openEquity;

it(
  "conducts a simple trade",
  async () =>
  {
    renderTradeView();

    await buyShares(
      {
        TotalShares: openShares,
        OpenPrice: openPrice,
        OpenCount: openShares,
        ClosePrice: undefined,
        CloseCount: undefined,
        LedgerBalance: openBalance,
        LedgerChange: undefined,
      },
    );

    clickContinue();

    await exitShares(
      {
        TotalShares: 0,
        OpenPrice: openPrice,
        OpenCount: openShares,
        ClosePrice: closePrice,
        CloseCount: openShares,
        LedgerBalance: closeBalance,
        LedgerChange: ledgerChange,
      },
    );
  },
);
