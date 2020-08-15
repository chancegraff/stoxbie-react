import {
  within,
} from "@testing-library/react";

import SellButton from "./SellButton";

const SellButtonCheck = () =>
{
  return within(
    SellButton(),
  ).queryByTestId(
    "check",
  );
};

export default SellButtonCheck;
