import {
  screen,
} from "@testing-library/react";

export const TableHistoricalBody = () =>
{
  return screen.getByTestId(
    "historicalBody",
  );
};
