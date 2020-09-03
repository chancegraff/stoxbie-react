import {
  screen,
} from "@testing-library/react";

export const LineChart = () =>
{
  return screen.getByRole(
    "linechart",
  );
};
