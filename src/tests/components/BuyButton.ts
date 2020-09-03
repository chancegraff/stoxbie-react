import {
  screen,
} from "@testing-library/react";

export const BuyButton = () =>
{
  return screen.getByText(
    "Buy",
  );
};
