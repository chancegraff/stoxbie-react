import {
  addBusinessDays,
} from "date-fns";

import {
  historicalRowShouldChange,
  presentRowShouldChange,
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

const openShares = 200;
const openPrice = dayOnePrice.close;
const openEquity = openPrice * openShares;
const openBalance = initialLedgerBalance - openEquity;

const closePrice = dayTwoPrice.close;
const closeEquity = closePrice * openShares;
const closeBalance = openBalance + closeEquity;

const equityChange = closeEquity - openEquity;
const ledgerChange = equityChange / openEquity;

const dayOneTrade = {
  OpenPrice: openPrice,
  OpenCount: openShares,
  ClosePrice: undefined,
  CloseCount: undefined,
  LedgerBalance: openBalance,
  LedgerChange: undefined,
};
const dayTwoTrade = {
  OpenPrice: openPrice,
  OpenCount: openShares,
  ClosePrice: closePrice,
  CloseCount: openShares,
  LedgerBalance: closeBalance,
  LedgerChange: ledgerChange,
};

it(
  "conducts a simple trade",
  () =>
  {
    renderTradeView();

    buyShares(
      dayOneTrade,
    );

    presentRowShouldChange(
      dayOneTrade,
    );

    clickContinue();

    exitShares();

    const [
      historicalRow,
    ] = TableHistoricalRows();

    historicalRowShouldChange(
      historicalRow,
      dayTwoTrade,
    );
  },
);
