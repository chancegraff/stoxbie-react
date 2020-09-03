import {
  screen,
} from "@testing-library/react";

export const SellButton = () =>
{
  return screen.getByText(
    "Sell",
  );
};
