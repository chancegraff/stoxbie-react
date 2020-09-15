import {
  addBusinessDays,
} from "date-fns";

import {
  historicalRowShouldChange,
  presentRowShouldChange,
  tableFooterShouldChange,
} from "tests/Assertions";
import {
  TableHistoricalRows,
} from "tests/Components";
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

// Day 1: Buy 200 shares
const dayOneShares = 200;
const dayOneClose = dayOnePrice.close;
const dayOneEquity = dayOneClose * dayOneShares;
const dayOneBalance = initialLedgerBalance - dayOneEquity;
const dayOneTrade = {
  TotalCount: dayOneShares,
  TotalBalance: undefined,
  TotalPrice: dayOneClose,
  OpenPrice: dayOneClose,
  OpenCount: dayOneShares,
  ClosePrice: undefined,
  CloseCount: undefined,
  LedgerBalance: dayOneBalance,
  LedgerChange: undefined,
};

// Day 2: Sell day one's 200 shares
const dayTwoShares = dayOneShares;
const dayTwoClose = dayTwoPrice.close;
const dayTwoEquity = dayTwoClose * dayTwoShares;
const dayTwoBalance = dayOneBalance + dayTwoEquity;
const dayTwoProfit = dayTwoEquity - dayOneEquity;
const dayTwoChange = dayTwoProfit / dayOneEquity;
const dayTwoTrade = {
  TotalCount: 0,
  TotalBalance: undefined,
  TotalPrice: dayTwoClose,
  OpenPrice: dayOneClose,
  OpenCount: dayOneShares,
  ClosePrice: dayTwoClose,
  CloseCount: dayTwoShares,
  LedgerBalance: dayTwoBalance,
  LedgerChange: dayTwoChange,
};

it(
  "conducts a simple trade",
  () =>
  {
    renderTradeView();

    // Day 1: Buy 200 shares
    buyShares(
      dayOneTrade,
    );

    presentRowShouldChange(
      dayOneTrade,
    );

    tableFooterShouldChange(
      {
        LedgerBalance: dayOneBalance,
        LedgerChange: 0,
      },
    );

    clickContinue();

    // Day 2: Sell 200 shares
    exitShares();

    const [
      dayOneRow,
    ] = TableHistoricalRows();

    historicalRowShouldChange(
      dayOneRow,
      dayTwoTrade,
    );

    tableFooterShouldChange(
      {
        LedgerBalance: dayTwoBalance,
        LedgerChange: dayTwoChange,
      },
    );
  },
);
