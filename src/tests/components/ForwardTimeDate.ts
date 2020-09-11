import {
  screen,
} from "@testing-library/react";

export const ForwardTimeDate = (
  currentDate: string,
) =>
{
  return screen.getByText(
    `Today is ${currentDate}`,
  );
};
