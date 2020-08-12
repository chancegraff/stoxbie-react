import React from "react";
import {
  waitFor,
} from "@testing-library/react";
import {
  parseISO,
} from "date-fns";

import {
  renderWithBoilerplate,
} from "tests/utils/renderWithBoilerplate";
import {
  DateFormats,
  formatCurrency,
  formatParsedDate,
  formatPercentage,
} from "services/Utilities";
import TradeView from "views/TradeView";

import {
  componentShouldRender,
  ledgerBalanceShouldChange,
  ledgerChangeShouldChange,
  sliderShouldChange,
  tradeRowShouldHaveExitButton,
  tradeRowShouldHavePrice,
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

const iexStartDate = "2003-12-16";
const urlStartDate = "m12d16y2003";
const dayOneBalance = 10000;

const priceIndex = prices.findIndex(
  (
    price,
  ) =>
  {
    return price.date === iexStartDate;
  },
);

const dayOnePrice = prices[priceIndex];
const dayTwoPrice = prices[priceIndex + 1];
const dayThreePrice = prices[priceIndex + 2];
const dayFourPrice = prices[priceIndex + 3];
const dayFivePrice = prices[priceIndex + 4];

const calculateTrade = (
  sharePrice,
  shareCount,
  previousTrade = {},
) =>
{
  if (previousTrade.OpenPrice && previousTrade.OpenCount)
  {
    const {
      OpenPrice,
      OpenCount,
      ClosePrice = sharePrice,
      CloseCount = shareCount,
      LedgerBalance: PreviousLedgerBalance,
      LedgerReturns = (ClosePrice * CloseCount) - (OpenPrice * CloseCount),
      LedgerChange = LedgerReturns / PreviousLedgerBalance,
    } = previousTrade;

    return {
      OpenPrice,
      OpenCount,
      ClosePrice,
      CloseCount,
      LedgerBalance: PreviousLedgerBalance + (CloseCount * ClosePrice),
      LedgerReturns,
      LedgerChange,
    };
  }

  const {
    OpenPrice = sharePrice,
    OpenCount = shareCount,
    ClosePrice = undefined,
    CloseCount = undefined,
    LedgerBalance = 10000,
    LedgerReturns = undefined,
    LedgerChange = undefined,
  } = previousTrade;

  return {
    OpenPrice,
    OpenCount,
    ClosePrice,
    CloseCount,
    LedgerBalance: LedgerBalance - (OpenCount * OpenPrice),
    LedgerReturns,
    LedgerChange,
  };
};

const render = () =>
{
  return renderWithBoilerplate(
    (
      <TradeView
        date={
          parseISO(
            dayOnePrice.date,
          )
        }
        prices={prices}
        ticker={dayOnePrice.symbol}
      />
    ),
    "/stock/:ticker/:date",
    `/stock/${dayOnePrice.symbol}/${urlStartDate}`,
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
        dayOnePrice.symbol,
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
          dayOneBalance,
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
          dayOnePrice.date,
          DateFormats.IEX,
          DateFormats.Full,
        ),
      ),
    );

    clickContinue();

    componentShouldRender(
      TimeControlDate(
        formatParsedDate(
          dayTwoPrice.date,
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
          "0",
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
          `${shareCount}`,
        );
      },
    );
  },
);

describe(
  "conducts a simple trade",
  () =>
  {
    const dayOneTrade = calculateTrade(
      dayOnePrice.close,
      200,
    );
    const dayTwoTrade = calculateTrade(
      dayTwoPrice.close,
      200,
      dayOneTrade,
    );

    beforeEach(
      () =>
      {
        render();
      },
    );

    it(
      "buys 200 shares on first day",
      async () =>
      {
        changeSlider(
          dayOneTrade.OpenCount,
        );

        await waitFor(
          () =>
          {
            return sliderShouldChange(
              `${dayOneTrade.OpenCount}`,
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

        ledgerBalanceShouldChange(
          formatCurrency(
            dayOneTrade.LedgerBalance,
          ),
        );

        const tradeRows = TableTradeRows();

        tradeRowsShouldHaveLength(
          tradeRows,
          1,
        );

        const [
          openedTrade,
        ] = tradeRows;

        tradeRowShouldHavePrice(
          openedTrade,
          formatCurrency(
            dayOneTrade.OpenPrice,
          ),
        );

        tradeRowShouldHaveExitButton(
          openedTrade,
        );
      },
    );

    it(
      "sells 200 shares on second day",
      async () =>
      {
        clickContinue();

        changeSlider(
          dayTwoTrade.CloseCount,
        );

        await waitFor(
          () =>
          {
            return sliderShouldChange(
              `${dayTwoTrade.CloseCount}`,
            );
          },
        );

        clickSell();

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
          1,
        );

        const [
          closedTrade,
        ] = tradeRows;

        tradeRowShouldHavePrice(
          closedTrade,
          formatCurrency(
            dayTwoTrade.ClosePrice,
          ),
        );

        ledgerBalanceShouldChange(
          formatCurrency(
            dayTwoTrade.LedgerBalance,
          ),
        );

        ledgerChangeShouldChange(
          formatPercentage(
            dayTwoTrade.LedgerChange,
          ),
        );
      },
    );
  },
);

describe(
  "conducts a continuous trade",
  () =>
  {
    // Day 1: Buy 200 shares @ 3.2
    // 200 shares @ 3.2
    const fromFirstDay = {
      firstOpenedTrade: calculateTrade(
        dayOnePrice.close,
        200,
      ),
    };

    // Day 2: Sell 50/200 shares @ 3.79
    // 150 shares @ 3.2
    const fromSecondDay = {
      firstOpenedTrade: calculateTrade(
        dayOnePrice,
        150,
      ),
      firstClosedTrade: calculateTrade(
        dayTwoPrice.close,
        50,
        fromFirstDay.firstOpenedTrade,
      ),
    };

    // Day 3: Buy 100 shares @ 3.67
    // 100 shares @ 3.67 <- Displayed first
    // 150 shares @ 3.2 <- Sold first
    const fromThirdDay = {
      secondOpenedTrade: calculateTrade(
        dayThreePrice.close,
        100,
      ),
    };

    // Day 4: Sell 150/250 shares @ 3.78
    // 100 shares @ 3.67 <- Sold next
    const fromFourthDay = {
      secondClosedTrade: calculateTrade(
        dayFourPrice.close,
        150,
        fromSecondDay.firstOpenedTrade,
      ),
    };

    // Day 5: Sell 100/100 shares @ 3.79
    // Done!
    const fromFifthDay = {
      thirdClosedTrade: calculateTrade(
        dayFivePrice.close,
        100,
        fromThirdDay.secondOpenedTrade,
      ),
    };

    beforeEach(
      () =>
      {
        render();
      },
    );

    it(
      "buys 200 shares on first day",
      () =>
      {
        expect();
      },
    );

    it(
      "sells 50 shares on second day",
      () =>
      {
        expect();
      },
    );

    it(
      "buys 100 shares on third day",
      () =>
      {
        expect();
      },
    );

    it(
      "sells 150 shares on fourth day",
      () =>
      {
        expect();
      },
    );

    it(
      "sells 100 shares on fifth day",
      () =>
      {
        expect();
      },
    );
  },
);
