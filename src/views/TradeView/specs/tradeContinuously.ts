import {
  addBusinessDays,
} from "date-fns";

import {
  TableCombinedBody,
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

const dayOneShares = 200;
const dayOneClose = dayOnePrice.close;
const dayOneEquity = dayOneClose * dayOneShares;
const dayOneBalance = initialLedgerBalance - dayOneEquity;

const dayTwoShares = 50;
const dayTwoClose = dayTwoPrice.close;
const dayTwoEquity = dayTwoClose * dayTwoShares;
const dayTwoBalance = dayOneBalance - dayTwoEquity;

const dayThreeShares = 100;
const dayThreeClose = dayThreePrice.close;
const dayThreeEquity = dayThreeClose * dayThreeShares;
const dayThreeBalance = dayTwoBalance - dayThreeEquity;

// const closePrice = dayTwoPrice.close;
// const closeEquity = closePrice * openShares;
// const closeBalance = openBalance + closeEquity;

// const equityChange = closeEquity - openEquity;
// const ledgerChange = equityChange / openEquity;

it(
  "conducts a continuous trade",
  async () =>
  {
    renderTradeView();

    // Day 1: Buy 200 shares
    await buyShares(
      {
        TotalCount: undefined,
        TotalBalance: undefined,
        OpenPrice: dayOneClose,
        OpenCount: dayOneShares,
        ClosePrice: undefined,
        CloseCount: undefined,
        LedgerBalance: dayOneBalance,
        LedgerChange: undefined,
      },
    );

    clickContinue();

    // Day 2: Buy 50 shares
    await buyShares(
      {
        TotalCount: dayOneShares + dayTwoShares,
        TotalBalance: dayOneEquity + dayTwoEquity,
        OpenPrice: dayTwoClose,
        OpenCount: dayTwoShares,
        ClosePrice: undefined,
        CloseCount: undefined,
        LedgerBalance: dayTwoBalance,
        LedgerChange: undefined,
      },
    );

    clickContinue();

    // Day 3: Buy 100 shares
    await buyShares(
      {
        TotalCount: dayOneShares + dayTwoShares + dayThreeShares,
        TotalBalance: dayOneEquity + dayTwoEquity + dayThreeEquity,
        OpenPrice: dayThreeClose,
        OpenCount: dayThreeShares,
        ClosePrice: undefined,
        CloseCount: undefined,
        LedgerBalance: dayThreeBalance,
        LedgerChange: undefined,
      },
    );

    clickContinue();

    toggleCombinedRows();

    const dayTwoTrade = TableCombinedRow(
      `${dayTwoShares}`,
    );

    if (!dayTwoTrade)
    {
      throw new Error(
        "Couldn't find day two trade row in combined body",
      );
    }

    // Day 4: Sell 50 shares
    await exitShares(
      {
        TotalShares: 100,
        TotalEquity: 250.50,
        OpenPrice: 3.20,
        OpenCount: 150,
        ClosePrice: 3.78,
        CloseCount: 150,
        ChangeBalance: 87,
        ChangePercent: 0.18125,
        LedgerBalance: 9749.50,
        LedgerReturns: 116.50,
        LedgerChange: 0.0126871766948,
      },
      dayTwoTrade,
    );

    clickContinue();

    // Day 5: Buy 100 shares
    await exitShares(
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

    clickContinue();

    // Day 6: Sell present shares
    await exitShares(
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
