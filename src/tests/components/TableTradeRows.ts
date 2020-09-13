import {
  screen,
  within,
} from "@testing-library/react";

export const TableTradeRows = (
  container?: HTMLElement,
) =>
{
  if (!container)
  {
    return screen.getAllByRole(
      "row",
    );
  }

  return within(
    container,
  ).getAllByRole(
    "row",
  );
};
