import {
  screen,
} from "@testing-library/react";

const TradeSliderInput = () =>
{
  return screen.getByTestId(
    "sliderInput",
    {
      hidden: true,
    },
  );
};

export default TradeSliderInput;
