import {
  addBusinessDays,
} from "date-fns";

import {
  historicalRowsShouldChange,
  presentRowShouldChange,
} from "tests/Assertions";
import {
  TableCombinedRow,
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

// Day 3: Buy 100 shares
const dayThreeShares = 100;
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

console.log(
  "dayThreeTrade.TotalBalance",
  dayTwoTrade.TotalBalance,
  " + ",
  dayThreeEquity,
  " = ",
  dayTwoTrade.TotalBalance + dayThreeEquity,
);

// Day 4: Sell day two's 50 shares
const dayFourShares = dayTwoShares;
const dayFourClose = dayFourPrice.close;
const dayFourEquity = dayFourClose * dayFourShares;
const dayFourBalance = dayThreeBalance + dayFourEquity;

const equityChange = dayFourEquity - dayTwoEquity;
const totalEquityAfterDayFour = (
  dayOneEquity +
  dayTwoEquity +
  dayThreeEquity
);

const dayFourChange = 0 + (equityChange / totalEquityAfterDayFour);

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

console.log(
  "dayFiveTrade.TotalBalance",
  dayFourTrade.TotalBalance,
  " + ",
  dayFiveEquity,
  " = ",
  dayFourTrade.TotalBalance + dayFiveEquity,
);

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

    clickContinue();

    // Day 2: Buy 50 shares
    buyShares(
      dayTwoTrade,
    );

    presentRowShouldChange(
      dayTwoTrade,
    );

    clickContinue();

    // Day 3: Buy 100 shares
    buyShares(
      dayThreeTrade,
    );

    presentRowShouldChange(
      dayThreeTrade,
    );

    clickContinue();

    const combinedRowsState = toggleCombinedRows();

    const dayTwoRow = TableCombinedRow(
      `${dayTwoShares}`,
    );

    // Day 4: Sell day two's 50 shares
    exitShares(
      dayTwoRow,
    );

    historicalRowsShouldChange(
      dayFourTrade,
    );

    clickContinue();

    // Day 5: Buy 100 shares
    buyShares(
      dayFiveTrade,
    );

    presentRowShouldChange(
      dayFiveTrade,
    );

    clickContinue();

    // Day 6: Sell present shares
    exitShares(
      {
        TotalShares: 0,
        TotalEquity: 0,
        OpenPrice: 3.67,
        OpenCount: 100,
        ClosePrice: 3.79,
        CloseCount: 100,
        ChangeBalance: 12,
        ChangePercent: 0.032697547683924,
        LedgerBalance: 10128.5,
        LedgerReturns: 128.5,
        LedgerChange: 0.013180163085286,
      },
    );
  },
);
