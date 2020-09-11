import {
  screen,
} from "@testing-library/react";

export const Spinners = () =>
{
  return screen.queryAllByRole(
    "spinner",
  );
};
