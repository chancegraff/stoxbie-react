import {
  screen,
} from "@testing-library/react";

const TableHeaderChangePercent = () =>
{
  return screen.getByText(
    "PL %",
  );
};

export default TableHeaderChangePercent;
