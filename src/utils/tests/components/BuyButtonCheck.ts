import {
  within,
} from "@testing-library/react";

import {
  BuyButton,
} from "utils/tests/Components";

export const BuyButtonCheck = () =>
{
  return within(
    BuyButton(),
  ).queryByTestId(
    "check",
  );
};
