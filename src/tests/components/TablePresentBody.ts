import {
  screen,
} from "@testing-library/react";

export const TablePresentBody = () =>
{
  return screen.getByTestId(
    "presentBody",
  );
};
