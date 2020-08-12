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
    count,
  );
};

export const ledgerBalanceShouldChange = (
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

export const ledgerChangeShouldChange = (
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

export const tradeRowShouldHavePrice = (
  tradeRow,
  closePrice,
) =>
{
  return expect(
    within(
      tradeRow,
    ).getByText(
      closePrice,
    ),
  ).toBeInTheDocument();
};

export const tradeRowShouldHaveExitButton = (
  tradeRow,
) =>
{
  return expect(
    within(
      tradeRow,
    ).getByText(
      "Exit",
    ),
  ).toBeInTheDocument();
};
