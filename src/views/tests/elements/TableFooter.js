import {
  screen,
} from "@testing-library/react";

const TableFooter = () =>
{
  return screen.getByRole(
    "footerRow",
  );
};

export default TableFooter;
