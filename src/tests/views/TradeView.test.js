
import React from "react";
import {
  fireEvent,
  screen,
} from "@testing-library/react";
import { parseISO } from "date-fns";

import { renderWithBoilerplate } from "tests/utils/renderWithBoilerplate";
import { formatCurrency } from "services/Utilities";
import TradeView from "views/TradeView";

import prices from "./TradeView.prices.json";

const date = parseISO("2003-12-16");
const ticker = "NFLX";
const route = `/stock/${ticker}/m12d16y2003`;
const path = "/stock/:ticker/:date";

const startBalance = 10000;
const startPrice = prices.find((price) =>
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

    // Breadcrumbs
    expect(screen.getByLabelText("Breadcrumbs navigation")).toBeInTheDocument();
    expect(screen.getByText(ticker)).toBeInTheDocument();

    // StockChart
    expect(screen.getByRole("linechart")).toBeInTheDocument();

    // TimeControl
    expect(screen.getByText("Continue")).toBeInTheDocument();

    // TradeControl
    expect(screen.getByText("Buy")).toBeInTheDocument();
    expect(screen.getByText("Sell")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();

    // TradeHistory header
    expect(screen.getByText("Open")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByText("PL %")).toBeInTheDocument();
    expect(screen.getByText("PL $")).toBeInTheDocument();

    // TradeHistory footer
    expect(screen.getByText("$10k")).toBeInTheDocument();
  },
);

// Current price:
// {
//   date: "2003-12-16",
//   uClose: 45.7,
//   uOpen: 46.07,
//   uHigh: 47.13,
//   uLow: 45.23,
//   uVolume: 1422167,
//   close: 3.2,
//   open: 3.37,
//   high: 3.31,
//   low: 3.17,
//   volume: 19970492,
//   currency: "",
//   change: -0.0376,
//   changePercent: -1.1719,
//   label: "Dec 16, 03",
//   changeOverTime: 1.406634,
// }

it(
  "buys shares",
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

    fireEvent.change(
      screen.getByRole("slider"),
      { value: [ 200 ] },
    );

    fireEvent.click(screen.getByText("Buy"));

    const openCellContent = formatCurrency(startPrice.close);
    const balanceCellContent = formatCurrency(startBalance - startPrice.close);

    expect(screen.getByText(openCellContent)).toBeInTheDocument();
    expect(screen.getByText(balanceCellContent)).toBeInTheDocument();
    expect(screen.getByText("Exit")).toBeInTheDocument();
  },
);
