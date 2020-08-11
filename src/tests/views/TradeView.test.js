
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

    const currentPrice = prices[priceIndex];
    const currentDate = formatParsedDate(
      currentPrice.date,
      DateFormats.IEX,
      DateFormats.Full,
    );

    expect(screen.getByText(`Today is ${currentDate}`)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Continue"));

    const nextPrice = prices[priceIndex + 1];
    const nextDate = formatParsedDate(
      nextPrice.date,
      DateFormats.IEX,
      DateFormats.Full,
    );

    expect(screen.getByText(`Today is ${nextDate}`)).toBeInTheDocument();
  },
);

it(
  "buys and sells shares",
  () =>
  {
    const startPrice = prices[priceIndex];

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

    fireEvent.change(
      screen.getByRole("slider"),
      { value: [ shareCount ] },
    );

    fireEvent.click(screen.getByText("Buy"));

    // Total balance should be updated
    const balanceCellContent = formatCurrency(startBalance - startPrice.close);

    expect(screen.getByText(balanceCellContent)).toBeInTheDocument();

    // Table history rows should be updated
    const tradeHistoryRows = within(screen.getByRole("rowgroup")).getAllByRole("row");

    expect(tradeHistoryRows.length).toBe(1);

    // Current trade row should be created
    const [ openRow ] = tradeHistoryRows;
    const openCellContent = formatCurrency(startPrice.close);

    expect(within(openRow).getByText(openCellContent)).toBeInTheDocument();
    expect(within(openRow).getByText("Exit")).toBeInTheDocument();
  },
);
