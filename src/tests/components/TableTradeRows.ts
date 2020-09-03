import {
  screen,
} from "@testing-library/react";

export const TableTradeRows = () =>
{
  return screen.getAllByRole(
    "row",
  );
};
