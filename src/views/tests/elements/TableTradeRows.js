import {
  screen,
} from "@testing-library/react";

const TableTradeRows = () =>
{
  return screen.getAllByRole(
    "row",
  );
};

export default TableTradeRows;
