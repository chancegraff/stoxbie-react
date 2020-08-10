
import React from "react";
import { screen } from "@testing-library/react";

import { renderWithBoilerplate } from "tests/utils/renderWithBoilerplate";
import TradeView from "views/TradeView";

import prices from "./TradeView.prices.json";

const date = new Date("12-31-2003");
const ticker = "NFLX";
const route = `/stock/${ticker}/m12d31y2003`;
const path = "/stock/:ticker/:date";

it(
  "renders trade view using boilerplate wrapper",
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

    expect(screen.getByText("Continue")).toBeInTheDocument();
    expect(screen.getByLabelText("Breadcrumbs navigation")).toBeInTheDocument();
    expect(screen.getByText(ticker)).toBeInTheDocument();
  },
);
