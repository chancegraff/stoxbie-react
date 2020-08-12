import React from "react";
import {
  fireEvent,
  screen,
  waitFor,
  within,
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

import prices from "./TradeView.prices.json";

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

const changeSlider = (
  source,
  value,
) =>
{
  fireEvent.change(
    source.getByTestId(
      "sliderInput",
      {
        hidden: true,
      },
    ),
    {
      target: {
        value,
      },
    },
  );
};

const clickContinue = (
  source,
) =>
{
  fireEvent.click(
    source.getByText(
      "Continue",
    ),
  );
};

const clickBuy = (
  source,
) =>
{
  fireEvent.click(
    source.getByText(
      "Buy",
    ),
  );
};

const clickSell = (
  source,
) =>
{
  fireEvent.click(
    source.getByText(
      "Sell",
    ),
  );
};

const getAllTradeRows = (
  source,
  length,
) =>
{
  // Get all trade rows
  const trades = source.getAllByRole(
    "row",
  );

  // Table should have one trade row
  expect(
    trades.length,
  ).toBe(
    length,
  );

  return trades;
};

const sliderShouldChange = (
  source,
  count,
) =>
{
  return expect(
    source.getByRole(
      "slider",
    ),
  ).toHaveAttribute(
    "aria-valuenow",
    `${count}`,
  );
};

const balanceShouldChange = (
  source,
  balance,
) =>
{
  return expect(
    within(
      source.getByRole(
        "footerRow",
      ),
    ).getByText(
      balance,
    ),
  ).toBeInTheDocument();
};

it(
  "renders trade view",
  () =>
  {
    renderWithBoilerplate(
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

    // Breadcrumbs should render
    expect(
      screen.getByLabelText(
        "Breadcrumbs navigation",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        ticker,
      ),
    ).toBeInTheDocument();

    // StockChart should render
    expect(
      screen.getByRole(
        "linechart",
      ),
    ).toBeInTheDocument();

    // TimeControl should render
    expect(
      screen.getByText(
        "Continue",
      ),
    ).toBeInTheDocument();

    // TradeControl should render
    expect(
      screen.getByText(
        "Buy",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Sell",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole(
        "slider",
      ),
    ).toBeInTheDocument();

    // TradeHistory header should render
    expect(
      screen.getByText(
        "Open",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Close",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "PL %",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "PL $",
      ),
    ).toBeInTheDocument();

    // TradeHistory footer should render
    expect(
      screen.getByText(
        formatCurrency(
          ledgerBalance,
        ),
      ),
    ).toBeInTheDocument();
  },
);

it(
  "continues forward in time",
  () =>
  {
    renderWithBoilerplate(
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

    // Current date should be on the page
    const currentDate = formatParsedDate(
      startPrice.date,
      DateFormats.IEX,
      DateFormats.Full,
    );

    expect(
      screen.getByText(
        `Today is ${currentDate}`,
      ),
    ).toBeInTheDocument();

    // Click the "continue" button
    clickContinue(
      screen,
    );

    // Next date should be on the page
    const nextDate = formatParsedDate(
      endPrice.date,
      DateFormats.IEX,
      DateFormats.Full,
    );

    expect(
      screen.getByText(
        `Today is ${nextDate}`,
      ),
    ).toBeInTheDocument();
  },
);

it(
  "changes share slider",
  async () =>
  {
    const shareCount = 200;

    renderWithBoilerplate(
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

    // Slider value should be 0
    await waitFor(
      () =>
      {
        return expect(
          screen.getByRole(
            "slider",
          ),
        ).toHaveAttribute(
          "aria-valuenow",
          "0",
        );
      },
    );

    // Change the hidden input value
    changeSlider(
      screen,
      shareCount,
    );

    // Slider value should be updated
    await waitFor(
      () =>
      {
        return expect(
          screen.getByRole(
            "slider",
          ),
        ).toHaveAttribute(
          "aria-valuenow",
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
        renderWithBoilerplate(
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
      },
    );

    it(
      "buys shares",
      async () =>
      {
        changeSlider(
          screen,
          shareCount,
        );

        await waitFor(
          () =>
          {
            return sliderShouldChange(
              screen,
              shareCount,
            );
          },
        );

        clickBuy(
          screen,
        );

        await waitFor(
          () =>
          {
            return sliderShouldChange(
              screen,
              0,
            );
          },
        );

        balanceShouldChange(
          screen,
          LedgerBalanceAfterOpen,
        );

        const [
          openedTrade,
        ] = await getAllTradeRows(
          screen,
          1,
        );

        // Row should have open price
        expect(
          within(
            openedTrade,
          ).getByText(
            StartPriceClose,
          ),
        ).toBeInTheDocument();

        // Row should have exit button
        expect(
          within(
            openedTrade,
          ).getByText(
            "Exit",
          ),
        ).toBeInTheDocument();
      },
    );

    it(
      "sells shares",
      async () =>
      {
        clickContinue(
          screen,
        );

        changeSlider(
          screen,
          shareCount,
        );

        await waitFor(
          () =>
          {
            return sliderShouldChange(
              screen,
              shareCount,
            );
          },
        );

        clickSell(
          screen,
        );

        // Get close trade row
        const [
          closedTrade,
        ] = screen.getAllByRole(
          "row",
        );

        // Row should have close price
        expect(
          within(
            closedTrade,
          ).getByText(
            EndPriceClose,
          ),
        ).toBeInTheDocument();

        // Total balance should be updated
        expect(
          within(
            screen.getByRole(
              "footerRow",
            ),
          ).getByText(
            LedgerBalanceAfterClose,
          ),
        ).toBeInTheDocument();

        // Total change should be updated
        expect(
          within(
            screen.getByRole(
              "footerRow",
            ),
          ).getByText(
            LedgerChangeAfterClose,
          ),
        ).toBeInTheDocument();
      },
    );
  },
);
