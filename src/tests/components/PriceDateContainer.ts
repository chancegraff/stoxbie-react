import {
  screen,
} from "@testing-library/react";

export const PriceDateContainer = () =>
{
  return screen.getByTestId(
    "priceDate",
  );
};
