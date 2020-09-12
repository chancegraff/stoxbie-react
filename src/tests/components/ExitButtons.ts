import {
  within,
} from "@testing-library/react";

export const ExitButtons = (
  container: HTMLElement,
) =>
{
  return within(
    container,
  ).queryAllByTestId(
    "exit",
  );
};
