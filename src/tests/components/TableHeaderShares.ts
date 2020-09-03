import {
  screen,
} from "@testing-library/react";

export const TableHeaderShares = () =>
{
  return screen.getByText(
    "Shares",
  );
};
