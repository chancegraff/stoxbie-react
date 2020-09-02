import {
  screen,
} from "@testing-library/react";

export const TableHeaderDollarBalance = () =>
{
  return screen.getByText(
    "PL $",
  );
};
