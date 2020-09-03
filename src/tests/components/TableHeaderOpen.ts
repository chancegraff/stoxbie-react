import {
  screen,
} from "@testing-library/react";

export const TableHeaderOpen = () =>
{
  return screen.getByText(
    "Open",
  );
};
