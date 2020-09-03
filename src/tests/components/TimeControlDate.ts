import {
  screen,
} from "@testing-library/react";

export const TimeControlDate = (
  currentDate: string,
) =>
{
  return screen.getByText(
    `Today is ${currentDate}`,
  );
};
