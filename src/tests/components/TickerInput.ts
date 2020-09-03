import {
  screen,
} from "@testing-library/react";

export const TickerInput = () =>
{
  return screen.getByRole(
    "search",
  );
};
