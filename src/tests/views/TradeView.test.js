import React from "react";
import {
  waitFor,
} from "@testing-library/react";
import {
  parseISO,
} from "date-fns";

import {
  calculateClosedTrade,
} from "tests/utils/calculateTrades";
import {
  renderWithBoilerplate,
} from "tests/utils/renderWithBoilerplate";
import {
  DateFormats,
  formatCurrency,
  formatParsedDate,
} from "services/Utilities";
import TradeView from "views/TradeView";

import {
  balanceShouldChange,
  changePercentShouldChange,
  componentShouldRender,
  sliderShouldChange,
  tradeRowShouldHaveClosePrice,
  tradeRowShouldHaveExitButton,
  tradeRowsShouldHaveLength,
} from "./TradeView.assertions";
import {
  BreadcrumbsContainer,
  BreadcrumbsTicker,
  BuyButton,
  ContinueButton,
  LineChart,
  SellButton,
  TableFooterDollarBalance,
  TableHeaderChangePercent,
  TableHeaderClose,
  TableHeaderDollarBalance,
  TableHeaderOpen,
  TableTradeRows,
  TimeControlDate,
  TradeSlider,
} from "./TradeView.components";
import {
  changeSlider,
  clickBuy,
  clickContinue,
  clickSell,
} from "./TradeView.events";
import prices from "./TradeView.prices";

const date = parseISO(
  "2003-12-16",
);
const ticker = "NFLX";
const route = `/stock/${ticker}/m12d16y2003`;
const path = "/stock/:ticker/:date";

const ledgerBalance = 10000;
const priceIndex = prices.findIndex(
  (
    price,
  ) =>
  {
    return price.date === "2003-12-16";
  },
);

const startPrice = prices[priceIndex];
const endPrice = prices[priceIndex + 1];

const render = () =>
{
  return renderWithBoilerplate(
    (
      <TradeView
        date={date}
        prices={prices}
        ticker={ticker}
      />
    ),
    path,
    route,
  );
};

it(
  "renders trade view",
  () =>
  {
    render();

    componentShouldRender(
      BreadcrumbsContainer(),
    );

    componentShouldRender(
      BreadcrumbsTicker(
        ticker,
      ),
    );

    componentShouldRender(
      LineChart(),
    );

    componentShouldRender(
      ContinueButton(),
    );

    componentShouldRender(
      TradeSlider(),
    );

    componentShouldRender(
      BuyButton(),
    );

    componentShouldRender(
      SellButton(),
    );

    componentShouldRender(
      TableHeaderOpen(),
    );

    componentShouldRender(
      TableHeaderClose(),
    );

    componentShouldRender(
      TableHeaderChangePercent(),
    );

    componentShouldRender(
      TableHeaderDollarBalance(),
    );

    componentShouldRender(
      TableFooterDollarBalance(
        formatCurrency(
          ledgerBalance,
        ),
      ),
    );
  },
);

it(
  "continues forward in time",
  () =>
  {
    render();

    componentShouldRender(
      TimeControlDate(
        formatParsedDate(
          startPrice.date,
          DateFormats.IEX,
          DateFormats.Full,
        ),
      ),
    );

    clickContinue();

    componentShouldRender(
      TimeControlDate(
        formatParsedDate(
          endPrice.date,
          DateFormats.IEX,
          DateFormats.Full,
        ),
      ),
    );
  },
);

it(
  "changes share slider",
  async () =>
  {
    const shareCount = 200;

    render();

    await waitFor(
      () =>
      {
        return sliderShouldChange(
          0,
        );
      },
    );

    changeSlider(
      shareCount,
    );

    await waitFor(
      () =>
      {
        return sliderShouldChange(
          shareCount,
        );
      },
    );
  },
);

describe(
  "conducts a simple trade",
  () =>
  {
    const shareCount = 200;

    const {
      StartPriceClose,
      EndPriceClose,
      LedgerBalanceAfterOpen,
      LedgerBalanceAfterClose,
      LedgerChangeAfterClose,
    } = calculateClosedTrade(
      ledgerBalance,
      shareCount,
      {
        startPrice,
        endPrice,
      },
    );

    beforeEach(
      () =>
      {
        render();
      },
    );

    it(
      "buys shares",
      async () =>
      {
        changeSlider(
          shareCount,
        );

        await waitFor(
          () =>
          {
            return sliderShouldChange(
              shareCount,
            );
          },
        );

        clickBuy();

        await waitFor(
          () =>
          {
            return sliderShouldChange(
              0,
            );
          },
        );

        balanceShouldChange(
          LedgerBalanceAfterOpen,
        );

        const tradeRows = TableTradeRows();

        tradeRowsShouldHaveLength(
          tradeRows,
          1,
        );

        const [
          openedTrade,
        ] = tradeRows;

        tradeRowShouldHaveClosePrice(
          openedTrade,
          StartPriceClose,
        );

        tradeRowShouldHaveExitButton(
          openedTrade,
        );
      },
    );

    it(
      "sells shares",
      async () =>
      {
        clickContinue();

        changeSlider(
          shareCount,
        );

        await waitFor(
          () =>
          {
            return sliderShouldChange(
              shareCount,
            );
          },
        );

        clickSell();

        const tradeRows = TableTradeRows();

        tradeRowsShouldHaveLength(
          tradeRows,
          1,
        );

        const [
          closedTrade,
        ] = tradeRows;

        tradeRowShouldHaveClosePrice(
          closedTrade,
          EndPriceClose,
        );

        balanceShouldChange(
          LedgerBalanceAfterClose,
        );

        changePercentShouldChange(
          LedgerChangeAfterClose,
        );
      },
    );
  },
);
