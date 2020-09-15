import {
  screen,
} from "@testing-library/react";

export const TableCombinedBody = () =>
{
  return screen.queryByTestId(
    "combinedBody",
  );
};
