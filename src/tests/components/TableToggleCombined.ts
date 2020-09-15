import {
  screen,
} from "@testing-library/react";

export const TableToggleCombined = () =>
{
  return screen.queryByTestId(
    "toggleCombined",
  );
};
