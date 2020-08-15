import {
  screen,
} from "@testing-library/react";

const TableHeaderShares = () =>
{
  return screen.getByText(
    "Shares",
  );
};

export default TableHeaderShares;
