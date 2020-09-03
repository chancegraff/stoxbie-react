import {
  screen,
} from "@testing-library/react";

export const TradeSlider = () =>
{
  return screen.getByRole(
    "slider",
  );
};
