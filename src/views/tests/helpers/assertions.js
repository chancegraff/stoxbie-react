import {
  prettyDOM,
  within,
} from "@testing-library/react";

import {
  BuyButtonCheck,
  SellButtonCheck,
  TableFooter,
  TradeSlider,
} from "./components";

export const componentShouldRender = (
  component,
) =>
{
  return expect(
    component,
  ).toBeInTheDocument();
};

export const componentsShouldRender = (
  components,
) =>
{
  return components.map(
    (
      component,
    ) =>
    {
      return componentShouldRender(
        component,
      );
    },
  );
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

export const buyButtonShouldChange = (
  active,
) =>
{
  const assertion = expect(
    BuyButtonCheck(),
  );

  return active
    ? assertion.not.toBeNull()
    : assertion.toBeNull();
};

export const sellButtonShouldChange = (
  active,
) =>
{
  const assertion = expect(
    SellButtonCheck(),
  );

  return active
    ? assertion.not.toBeNull()
    : assertion.toBeNull();
};

export const TradeTypes = {
  Buying: "buy",
  Selling: "sell",
};

export const tradeTypeShouldChange = (
  tradeType,
) =>
{
  if (tradeType === TradeTypes.Buying)
  {
    buyButtonShouldChange(
      true,
    );
    sellButtonShouldChange(
      false,
    );
  }
  else if (tradeType === TradeTypes.Selling)
  {
    buyButtonShouldChange(
      false,
    );
    sellButtonShouldChange(
      true,
    );
  }
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

export const tradeRowShouldHaveText = (
  tradeRow,
  text,
) =>
{
  return expect(
    within(
      tradeRow,
    ).getByText(
      text,
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
