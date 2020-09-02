import {
  within,
} from "@testing-library/react";

import {
  SellButton,
} from "utils/tests/Components";

export const SellButtonCheck = () =>
{
  return within(
    SellButton(),
  ).queryByTestId(
    "check",
  );
};
