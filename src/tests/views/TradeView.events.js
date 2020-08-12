import {
  fireEvent,
} from "@testing-library/react";

export const changeSlider = (
  source,
  value,
) =>
{
  fireEvent.change(
    source.getByTestId(
      "sliderInput",
      {
        hidden: true,
      },
    ),
    {
      target: {
        value,
      },
    },
  );
};

export const clickContinue = (
  source,
) =>
{
  fireEvent.click(
    source.getByText(
      "Continue",
    ),
  );
};

export const clickBuy = (
  source,
) =>
{
  fireEvent.click(
    source.getByText(
      "Buy",
    ),
  );
};

export const clickSell = (
  source,
) =>
{
  fireEvent.click(
    source.getByText(
      "Sell",
    ),
  );
};
