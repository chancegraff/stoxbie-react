import {
  within,
} from "@testing-library/react";

import {
  TablePresentBody,
} from "tests/Components";

export const TablePresentRows = () =>
{
  const presentBody = TablePresentBody();

  if (!presentBody)
  {
    return [];
  }

  return within(
    presentBody,
  ).queryAllByRole(
    "row",
  );
};
