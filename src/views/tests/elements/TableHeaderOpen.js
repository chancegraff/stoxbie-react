import {
  screen,
} from "@testing-library/react";

const TableHeaderOpen = () =>
{
  return screen.getByText(
    "Open",
  );
};

export default TableHeaderOpen;
