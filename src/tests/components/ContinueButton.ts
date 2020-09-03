import {
  screen,
} from "@testing-library/react";

export const ContinueButton = () =>
{
  return screen.getByText(
    "Continue",
  );
};
