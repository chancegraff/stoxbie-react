import {
  screen,
} from "@testing-library/react";

export const TableHeaderClose = () =>
{
  return screen.getByText(
    "Close",
  );
};
