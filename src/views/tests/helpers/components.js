import {
  screen,
} from "@testing-library/react";

export const BreadcrumbsContainer = () =>
{
  return screen.getByLabelText(
    "Breadcrumbs navigation",
  );
};

export const BreadcrumbsTicker = (
  ticker,
) =>
{
  return screen.getByText(
    ticker,
  );
};

export const LineChart = () =>
{
  return screen.getByRole(
    "linechart",
  );
};

export const ContinueButton = () =>
{
  return screen.getByText(
    "Continue",
  );
};

export const BuyButton = () =>
{
  return screen.getByText(
    "Buy",
  );
};

export const SellButton = () =>
{
  return screen.getByText(
    "Sell",
  );
};

export const TradeSlider = () =>
{
  return screen.getByRole(
    "slider",
  );
};

export const TradeSliderInput = () =>
{
  return screen.getByTestId(
    "sliderInput",
    {
      hidden: true,
    },
  );
};

export const TableHeaderOpen = () =>
{
  return screen.getByText(
    "Open",
  );
};

export const TableHeaderClose = () =>
{
  return screen.getByText(
    "Close",
  );
};

export const TableHeaderChangePercent = () =>
{
  return screen.getByText(
    "PL %",
  );
};

export const TableHeaderDollarBalance = () =>
{
  return screen.getByText(
    "PL $",
  );
};

export const TableTradeRows = () =>
{
  return screen.getAllByRole(
    "row",
  );
};

export const TableFooter = () =>
{
  return screen.getByRole(
    "footerRow",
  );
};

export const TableFooterDollarBalance = (
  dollarBalance,
) =>
{
  return screen.getByText(
    dollarBalance,
  );
};

export const TimeControlDate = (
  currentDate,
) =>
{
  return screen.getByText(
    `Today is ${currentDate}`,
  );
};
