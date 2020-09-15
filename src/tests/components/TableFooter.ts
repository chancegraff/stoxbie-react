import {
  screen,
} from "@testing-library/react";

export const TableFooter = () =>
{
  return screen.getByTestId(
    "footerRow",
  );
};
