import {
  screen,
} from "@testing-library/react";

const TimeControlDate = (
  currentDate,
) =>
{
  return screen.getByText(
    `Today is ${currentDate}`,
  );
};

export default TimeControlDate;
