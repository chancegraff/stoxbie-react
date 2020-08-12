import {
  within,
} from "@testing-library/react";

export const sliderShouldChange = (
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

export const balanceShouldChange = (
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

export const changePercentShouldChange = (
  source,
  changePercent,
) =>
{
  return expect(
    within(
      source.getByRole(
        "footerRow",
      ),
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
