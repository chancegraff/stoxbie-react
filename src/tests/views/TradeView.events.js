import {
  fireEvent,
} from "@testing-library/react";

import {
  BuyButton,
  ContinueButton,
  SellButton,
  TradeSliderInput,
} from "./TradeView.components";

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

export const clickContinue = () =>
{
  fireEvent.click(
    ContinueButton(),
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
