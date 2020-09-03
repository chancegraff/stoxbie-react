import {
  screen,
} from "@testing-library/react";

export const TableHeaderEquity = () =>
{
  return screen.getByText(
    "Equity",
  );
};
