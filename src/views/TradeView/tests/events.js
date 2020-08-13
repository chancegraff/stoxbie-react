import {
  fireEvent,
} from "@testing-library/react";

import {
  BuyButton,
  ContinueButton,
  SellButton,
  TradeSliderInput,
} from "./components";

export const changeSlider = (
  value,
) =>
{
  fireEvent.change(
    TradeSliderInput(),
    {
      target: {
        value,
      },
    },
  );
};

export const clickContinue = (
  times = 1,
) =>
{
  Array.from(
    Array(
      times,
    ),
    () =>
    {
      fireEvent.click(
        ContinueButton(),
      );
    },
  );
};

export const clickBuy = () =>
{
  fireEvent.click(
    BuyButton(),
  );
};

export const clickSell = () =>
{
  fireEvent.click(
    SellButton(),
  );
};
