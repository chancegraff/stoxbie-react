import {
  screen,
} from "@testing-library/react";

const TableHeaderDollarBalance = () =>
{
  return screen.getByText(
    "PL $",
  );
};

export default TableHeaderDollarBalance;
