
import React from "react";
import {
  fireEvent,
  prettyDOM,
  screen,
  waitFor,
  within,
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
} from "services/Utilities";
import TradeView from "views/TradeView";

import prices from "./TradeView.prices.json";

const date = parseISO(
  "2003-12-16",
);
const ticker = "NFLX";
const route = `/stock/${ticker}/m12d16y2003`;
const path = "/stock/:ticker/:date";

const shareCount = 200;
const startBalance = 10000;
const priceIndex = prices.findIndex(
  (
    price,
  ) =>
  {
    return price.date === "2003-12-16";
  },
);

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
          startBalance,
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
    const currentPrice = prices[priceIndex];
    const currentDate = formatParsedDate(
      currentPrice.date,
      DateFormats.IEX,
      DateFormats.Full,
    );

    expect(
      screen.getByText(
        `Today is ${currentDate}`,
      ),
    ).toBeInTheDocument();

    // Click the "continue" button
    fireEvent.click(
      screen.getByText(
        "Continue",
      ),
    );

    // Next date should be on the page
    const nextPrice = prices[priceIndex + 1];
    const nextDate = formatParsedDate(
      nextPrice.date,
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

describe(
  "conducts a simple trade",
  () =>
  {
    const startPrice = prices[priceIndex];
    const endPrice = prices[priceIndex + 1];

    const formattedStartPriceClose = formatCurrency(
      startPrice.close,
    );
    const formattedEndPriceClose = formatCurrency(
      endPrice.close,
    );

    const balanceAfterOpen = startBalance - (startPrice.close * shareCount);
    const balanceAfterClose = balanceAfterOpen + (endPrice.close * shareCount);

    const formattedBalanceAfterOpen = formatCurrency(
      balanceAfterOpen,
    );
    const formattedBalanceAfterClose = formatCurrency(
      balanceAfterClose,
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
        // Change the slider value
        fireEvent.change(
          screen.getByTestId(
            "slider",
            {
              hidden: true,
            },
          ),
          {
            target: {
              value: shareCount,
            },
          },
        );

        // Share count should be updated
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

        // Buy the shares
        fireEvent.click(
          screen.getByText(
            "Buy",
          ),
        );

        // Share count should be reset
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

        // Total balance should be updated
        expect(
          within(
            screen.getByRole(
              "footerRow",
            ),
          ).getByText(
            formattedBalanceAfterOpen,
          ),
        ).toBeInTheDocument();

        // Get all trade rows
        const trades = screen.getAllByRole(
          "row",
        );

        // Table should have one trade row
        expect(
          trades.length,
        ).toBe(
          1,
        );

        // Get open trade row
        const [
          openTrade,
        ] = trades;

        // Row should have open price
        expect(
          within(
            openTrade,
          ).getByText(
            formattedStartPriceClose,
          ),
        ).toBeInTheDocument();

        // Row should have exit button
        expect(
          within(
            openTrade,
          ).getByText(
            "Exit",
          ),
        ).toBeInTheDocument();
      },
    );

    // it(
    //   "sells shares",
    //   () =>
    //   {
    //     // Continue to next day
    //     fireEvent.click(
    //       screen.getByText(
    //         "Continue",
    //       ),
    //     );

    //     // Change the slider value
    //     fireEvent.change(
    //       screen.getByTestId(
    //         "slider",
    //         {
    //           hidden: true,
    //         },
    //       ),
    //       {
    //         value: [
    //           shareCount,
    //         ],
    //       },
    //     );

    //     // Share count should be updated
    //     expect(
    //       screen.getByTestId(
    //         "slider",
    //         {
    //           hidden: true,
    //         },
    //       ),
    //     ).toHaveValue(
    //       `${shareCount}`,
    //     );

    //     // Sell the shares
    //     fireEvent.click(
    //       screen.getByText(
    //         "Sell",
    //       ),
    //     );

    //     // Share count should be reset
    //     expect(
    //       screen.getByTestId(
    //         "slider",
    //         {
    //           hidden: true,
    //         },
    //       ),
    //     ).toHaveValue(
    //       `${shareCount}`,
    //     );

    //     // Total balance should be updated
    //     expect(
    //       screen.getByText(
    //         formatCurrency(
    //           balanceAfterClose,
    //         ),
    //       ),
    //     ).toBeInTheDocument();

    //     // Table history rows should be updated
    //     expect(
    //       withinTradeRows(
    //         screen,
    //       ).getAllByRole(
    //         "row",
    //       ).length,
    //     ).toBe(
    //       1,
    //     );

    //     // Current trade row should be created
    //     const [
    //       closeRow,
    //     ] = withinTradeRows(
    //       screen,
    //     ).getAllByRole(
    //       "row",
    //     );
    //     const closeCellContent = formatCurrency(
    //       endPrice.close,
    //     );

    //     expect(
    //       within(
    //         closeRow,
    //       ).getByText(
    //         closeCellContent,
    //       ),
    //     ).toBeInTheDocument();
    //   },
    // );
  },
);
