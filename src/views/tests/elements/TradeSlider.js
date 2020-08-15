import {
  screen,
} from "@testing-library/react";

const TradeSlider = () =>
{
  return screen.getByRole(
    "slider",
  );
};

export default TradeSlider;
