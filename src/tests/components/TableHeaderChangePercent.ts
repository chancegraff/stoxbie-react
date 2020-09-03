import {
  screen,
} from "@testing-library/react";

export const TableHeaderChangePercent = () =>
{
  return screen.getByText(
    "PL %",
  );
};
