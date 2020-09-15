import {
  addBusinessDays,
} from "date-fns";

import {
  historicalRowShouldChange,
  historicalRowsShouldHaveLength,
  presentRowShouldChange,
  tableFooterShouldChange,
} from "tests/Assertions";
import {
  TableCombinedRow,
  TableHistoricalRows,
} from "tests/Components";
import {
  buyShares,
  exitShares,
  toggleCombinedRows,
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
  dayThreePrice,
  dayFourPrice,
  dayFivePrice,
  daySixPrice,
] = getPriceRange(
  tradeViewStartDate,
  addBusinessDays(
    tradeViewStartDate,
    5,
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

// Day 2: Buy 50 shares
const dayTwoShares = 50;
const dayTwoClose = dayTwoPrice.close;
const dayTwoEquity = dayTwoClose * dayTwoShares;
const dayTwoBalance = dayOneBalance - dayTwoEquity;
const dayTwoTrade = {
  TotalCount: (
    dayOneShares +
    dayTwoShares
  ),
  TotalBalance: (
    dayOneEquity +
    dayTwoEquity
  ),
  TotalPrice: Math.max(
    dayOneClose,
    dayTwoClose,
  ),
  OpenPrice: dayTwoClose,
  OpenCount: dayTwoShares,
  ClosePrice: undefined,
  CloseCount: undefined,
  LedgerBalance: dayTwoBalance,
  LedgerChange: undefined,
};

// Day 3: Buy 150 shares
const dayThreeShares = 150;
const dayThreeClose = dayThreePrice.close;
const dayThreeEquity = dayThreeClose * dayThreeShares;
const dayThreeBalance = dayTwoBalance - dayThreeEquity;
const dayThreeTrade = {
  TotalCount: (
    dayOneShares +
    dayTwoShares +
    dayThreeShares
  ),
  TotalBalance: (
    dayOneEquity +
    dayTwoEquity +
    dayThreeEquity
  ),
  TotalPrice: Math.max(
    dayTwoClose,
    dayThreeClose,
  ),
  OpenPrice: dayThreeClose,
  OpenCount: dayThreeShares,
  ClosePrice: undefined,
  CloseCount: undefined,
  LedgerBalance: dayThreeBalance,
  LedgerChange: undefined,
};

// Day 4: Sell day two's 50 shares
const dayFourShares = dayTwoShares;
const dayFourClose = dayFourPrice.close;
const dayFourEquity = dayFourClose * dayFourShares;
const dayFourBalance = dayThreeBalance + dayFourEquity;

const dayFourEquityChange = dayFourEquity - dayTwoEquity;
const totalEquityAfterDayFour = (
  dayOneEquity +
  dayTwoEquity +
  dayThreeEquity
);

const dayFourChange = dayFourEquityChange / totalEquityAfterDayFour;

const dayFourTrade = {
  TotalCount: (
    dayOneShares +
    dayThreeShares
  ),
  TotalBalance: (
    dayOneEquity +
    dayThreeEquity
  ),
  TotalPrice: dayThreeClose,
  OpenPrice: dayTwoClose,
  OpenCount: dayTwoShares,
  ClosePrice: dayFourClose,
  CloseCount: dayFourShares,
  LedgerBalance: dayFourBalance,
  LedgerChange: dayFourChange,
};

// Day 5: Buy 100 shares
const dayFiveShares = 100;
const dayFiveClose = dayFivePrice.close;
const dayFiveEquity = dayFiveClose * dayFiveShares;
const dayFiveBalance = dayFourBalance - dayFiveEquity;
const dayFiveTrade = {
  TotalCount: (
    dayOneShares +
    dayThreeShares +
    dayFiveShares
  ),
  TotalBalance: (
    dayOneEquity +
    dayThreeEquity +
    dayFiveEquity
  ),
  TotalPrice: Math.max(
    dayThreeClose,
    dayFiveClose,
  ),
  OpenPrice: dayFiveClose,
  OpenCount: dayFiveShares,
  ClosePrice: undefined,
  CloseCount: undefined,
  LedgerBalance: dayFiveBalance,
  LedgerChange: undefined,
};

// Day 6: Sell present shares
const daySixShares = (
  dayOneShares +
  dayThreeShares +
  dayFiveShares
);
const daySixClose = daySixPrice.close;
const daySixEquity = daySixClose * daySixShares;
const daySixBalance = dayFiveBalance + daySixEquity;

const equityFromAllDays = (
  dayOneEquity +
  dayTwoEquity +
  dayThreeEquity +
  dayFiveEquity
);
const returnsFromAllDays = (
  daySixEquity +
  dayTwoEquity
) - equityFromAllDays;

const daySixChange = (
  returnsFromAllDays /
  equityFromAllDays
);

const soldDayOneTrade = {
  TotalCount: 0,
  TotalBalance: dayOneShares * daySixClose,
  TotalPrice: undefined,
  OpenPrice: dayOneClose,
  OpenCount: dayOneShares,
  ClosePrice: daySixClose,
  CloseCount: dayOneShares,
  LedgerBalance: daySixBalance,
  LedgerChange: daySixChange,
};
const soldDayThreeTrade = {
  TotalCount: 0,
  TotalBalance: dayThreeShares * daySixClose,
  TotalPrice: undefined,
  OpenPrice: dayThreeClose,
  OpenCount: dayThreeShares,
  ClosePrice: daySixClose,
  CloseCount: dayThreeShares,
  LedgerBalance: daySixBalance,
  LedgerChange: daySixChange,
};
const soldDayFiveTrade = {
  TotalCount: 0,
  TotalBalance: dayFiveShares * daySixClose,
  TotalPrice: undefined,
  OpenPrice: dayFiveClose,
  OpenCount: dayFiveShares,
  ClosePrice: daySixClose,
  CloseCount: dayFiveShares,
  LedgerBalance: daySixBalance,
  LedgerChange: daySixChange,
};

/**
 * @todo Everything above is... not good,
 * definitely needs to be refactored into
 * actual code; for now it is temporary
 */
it(
  "conducts a continuous trade",
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

    // Day 2: Buy 50 shares
    buyShares(
      dayTwoTrade,
    );

    presentRowShouldChange(
      dayTwoTrade,
    );

    tableFooterShouldChange(
      {
        LedgerBalance: dayTwoBalance,
        LedgerChange: 0,
      },
    );

    clickContinue();

    // Day 3: Buy 100 shares
    buyShares(
      dayThreeTrade,
    );

    presentRowShouldChange(
      dayThreeTrade,
    );

    tableFooterShouldChange(
      {
        LedgerBalance: dayThreeBalance,
        LedgerChange: 0,
      },
    );

    clickContinue();

    toggleCombinedRows();

    const dayTwoPresentRow = TableCombinedRow(
      `${dayTwoShares}`,
    );

    // Day 4: Sell day two's 50 shares
    exitShares(
      dayTwoPresentRow,
    );

    const [
      firstDayTwoRow,
    ] = TableHistoricalRows();

    historicalRowShouldChange(
      firstDayTwoRow,
      dayFourTrade,
    );

    tableFooterShouldChange(
      {
        LedgerBalance: dayFourBalance,
        LedgerChange: dayFourChange,
      },
    );

    clickContinue();

    // Day 5: Buy 100 shares
    buyShares(
      dayFiveTrade,
    );

    presentRowShouldChange(
      dayFiveTrade,
    );

    tableFooterShouldChange(
      {
        LedgerBalance: dayFiveBalance,
        LedgerChange: dayFourChange,
      },
    );

    clickContinue();

    // Day 6: Sell present shares
    exitShares();

    const historicalRows = TableHistoricalRows();

    historicalRowsShouldHaveLength(
      historicalRows,
      4,
    );

    const [
      dayFiveRow,
      dayThreeRow,
      dayOneRow,
    ] = historicalRows;

    historicalRowShouldChange(
      dayFiveRow,
      soldDayFiveTrade,
    );

    historicalRowShouldChange(
      dayThreeRow,
      soldDayThreeTrade,
    );

    historicalRowShouldChange(
      dayOneRow,
      soldDayOneTrade,
    );

    tableFooterShouldChange(
      {
        LedgerBalance: daySixBalance,
        LedgerChange: daySixChange,
      },
    );
  },
);
