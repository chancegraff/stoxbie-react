import {
  screen,
} from "@testing-library/react";

export const TableFooter = () =>
{
  return screen.getByRole(
    "footerRow",
  );
};
