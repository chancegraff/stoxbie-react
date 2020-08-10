import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  render,
  screen,
} from "@testing-library/react";
import ResizeObserver from "mocks/ResizeObserver";

import BaseUI from "services/BaseUI";
import TradeView from "views/TradeView";

it(
  "renders trade view",
  () =>
  {
    const date = new Date();
    const prices = [];
    const ticker = "NFLX";

    render((
      <BrowserRouter>
        <BaseUI>
          <TradeView
            date={date}
            prices={prices}
            ticker={ticker}
          />
        </BaseUI>
      </BrowserRouter>
    ));

    expect(screen.getByText("Continue")).toBeInTheDocument();
  },
);
