import {
  screen,
} from "@testing-library/react";

const TableHeaderEquity = () =>
{
  return screen.getByText(
    "Equity",
  );
};

export default TableHeaderEquity;
