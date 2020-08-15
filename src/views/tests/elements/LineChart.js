import {
  screen,
} from "@testing-library/react";

const LineChart = () =>
{
  return screen.getByRole(
    "linechart",
  );
};

export default LineChart;
