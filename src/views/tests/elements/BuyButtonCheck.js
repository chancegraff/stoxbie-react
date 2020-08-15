import {
  within,
} from "@testing-library/react";

import BuyButton from "./BuyButton";

const BuyButtonCheck = () =>
{
  return within(
    BuyButton(),
  ).queryByTestId(
    "check",
  );
};

export default BuyButtonCheck;
