import {
  screen,
} from "@testing-library/react";

export const PriceDateText = (
  date: string,
) =>
{
  return screen.getByText(
    `Today is ${date}`,
  );
};
