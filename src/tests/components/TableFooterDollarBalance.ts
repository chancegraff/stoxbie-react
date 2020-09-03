import {
  screen,
} from "@testing-library/react";

export const TableFooterDollarBalance = (
  dollarBalance: string,
) =>
{
  return screen.getByText(
    dollarBalance,
  );
};
