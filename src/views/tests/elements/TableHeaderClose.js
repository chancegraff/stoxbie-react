import {
  screen,
} from "@testing-library/react";

const TableHeaderClose = () =>
{
  return screen.getByText(
    "Close",
  );
};

export default TableHeaderClose;
