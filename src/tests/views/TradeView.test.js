
import React from "react";
import {
  fireEvent,
  screen,
  within,
} from "@testing-library/react";
import { parseISO } from "date-fns";

import { renderWithBoilerplate } from "tests/utils/renderWithBoilerplate";
import {
  DateFormats,
  formatCurrency,
  formatParsedDate,
} from "services/Utilities";
import TradeView from "views/TradeView";

import prices from "./TradeView.prices.json";

const date = parseISO("2003-12-16");
const ticker = "NFLX";
const route = `/stock/${ticker}/m12d16y2003`;
const path = "/stock/:ticker/:date";

const shareCount = 200;
const startBalance = 10000;
const priceIndex = prices.findIndex((price) =>
{
  return price.date === "2003-12-16";
});

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
    expect(screen.getByLabelText("Breadcrumbs navigation")).toBeInTheDocument();
    expect(screen.getByText(ticker)).toBeInTheDocument();

    // StockChart should render
    expect(screen.getByRole("linechart")).toBeInTheDocument();

    // TimeControl should render
    expect(screen.getByText("Continue")).toBeInTheDocument();

    // TradeControl should render
    expect(screen.getByText("Buy")).toBeInTheDocument();
    expect(screen.getByText("Sell")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();

    // TradeHistory header should render
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByText("PL %")).toBeInTheDocument();
    expect(screen.getByText("PL $")).toBeInTheDocument();

    // TradeHistory footer should render
    expect(screen.getByText(formatCurrency(startBalance))).toBeInTheDocument();
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

    expect(screen.getByText(`Today is ${currentDate}`)).toBeInTheDocument();

    // Click the "continue" button
    fireEvent.click(screen.getByText("Continue"));

    // Next date should be on the page
    const nextPrice = prices[priceIndex + 1];
    const nextDate = formatParsedDate(
      nextPrice.date,
      DateFormats.IEX,
      DateFormats.Full,
    );

    expect(screen.getByText(`Today is ${nextDate}`)).toBeInTheDocument();
  },
);

describe(
  "conducts a simple trade",
  () =>
  {
    const withinTradeRows = (source) =>
    {
      return within(source.getByRole("rowgroup"));
    };

    const startPrice = prices[priceIndex];
    const endPrice = prices[priceIndex + 1];

    const balanceAfterOpen = startBalance - (startPrice.close * shareCount);
    const balanceAfterClose = balanceAfterOpen + (endPrice.close * shareCount);

    beforeEach(() =>
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
    });

    it(
      "buys shares",
      () =>
      {
        expect(within(screen.getByRole("footerRow")).getByText(formatCurrency(startBalance))).toBeInTheDocument();

        // Should change the slider and click buy
        fireEvent.mouseUp(
          screen.getByTestId("sliderTrack"),
          { value: [ shareCount ] },
        );

        expect(screen.getByRole("slider")).toHaveAttribute(
          "aria-valuenow",
          `${shareCount}`,
        );

        fireEvent.click(screen.getByText("Buy"));

        expect(screen.getByRole("slider")).toHaveAttribute(
          "aria-valuenow",
          "0",
        );

        // Total balance should be updated
        const tomorrowsRows = screen.getAllByRole("row");
        const tomorrowsFooterRow = tomorrowsRows[tomorrowsRows.length - 1];

        expect(within(tomorrowsFooterRow).getByText(formatCurrency(balanceAfterOpen))).toBeInTheDocument();

        // Table  should be updated
        const nextTradeRows = withinTradeRows(screen).getAllByRole("row");
        const [ openRow ] = withinTradeRows(screen).getAllByRole("row");
        const openCellContent = formatCurrency(startPrice.close);

        expect(nextTradeRows.length).toBe(1);
        expect(within(openRow).getByText(openCellContent)).toBeInTheDocument();
        expect(within(openRow).getByText("Exit")).toBeInTheDocument();
      },
    );

    it(
      "sells shares",
      () =>
      {
        fireEvent.click(screen.getByText("Continue"));

        fireEvent.mouseDown(
          screen.getByTestId("sliderTrack"),
          { value: [ shareCount ] },
        );

        fireEvent.click(screen.getByText("Sell"));

        // Slider should be reset
        expect(screen.getByRole("slider")).toHaveAttribute(
          "aria-valuenow",
          "0",
        );

        // Total balance should be updated
        expect(screen.getByText(formatCurrency(balanceAfterClose))).toBeInTheDocument();

        // Table history rows should be updated
        expect(withinTradeRows(screen).getAllByRole("row").length).toBe(1);

        // Current trade row should be created
        const [ closeRow ] = withinTradeRows(screen).getAllByRole("row");
        const closeCellContent = formatCurrency(endPrice.close);

        expect(within(closeRow).getByText(closeCellContent)).toBeInTheDocument();
      },
    );
  },
);
