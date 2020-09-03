import {
  within,
} from "@testing-library/react";

import {
  BuyButton,
} from "tests/Components";

export const BuyButtonCheck = () =>
{
  return within(
    BuyButton(),
  ).queryByTestId(
    "check",
  );
};
