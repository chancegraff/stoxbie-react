import {
  screen,
} from "@testing-library/react";

const TableFooterDollarBalance = (
  dollarBalance,
) =>
{
  return screen.getByText(
    dollarBalance,
  );
};

export default TableFooterDollarBalance;
