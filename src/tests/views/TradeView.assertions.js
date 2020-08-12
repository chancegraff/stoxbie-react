import {
  within,
} from "@testing-library/react";

import {
  TableFooter,
  TradeSlider,
} from "./TradeView.components";

export const componentShouldRender = (
  component,
) =>
{
  return expect(
    component,
  ).toBeInTheDocument();
};

export const sliderShouldChange = (
  count,
) =>
{
  return expect(
    TradeSlider(),
  ).toHaveAttribute(
    "aria-valuenow",
    `${count}`,
  );
};

export const balanceShouldChange = (
  balance,
) =>
{
  return expect(
    within(
      TableFooter(),
    ).getByText(
      balance,
    ),
  ).toBeInTheDocument();
};

export const changePercentShouldChange = (
  changePercent,
) =>
{
  return expect(
    within(
      TableFooter(),
    ).getByText(
      changePercent,
    ),
  ).toBeInTheDocument();
};

export const tradeRowsShouldHaveLength = (
  tradeRows,
  length,
) =>
{
  return expect(
    tradeRows,
  ).toHaveLength(
    length,
  );
};

export const tradeRowShouldHaveClosePrice = (
  openedTrade,
  closePrice,
) =>
{
  return expect(
    within(
      openedTrade,
    ).getByText(
      closePrice,
    ),
  ).toBeInTheDocument();
};

export const tradeRowShouldHaveExitButton = (
  openedTrade,
) =>
{
  return expect(
    within(
      openedTrade,
    ).getByText(
      "Exit",
    ),
  ).toBeInTheDocument();
};
