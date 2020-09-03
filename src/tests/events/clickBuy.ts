import {
  fireEvent,
} from "@testing-library/react";

import {
  BuyButton,
} from "tests/Components";

export const clickBuy = () =>
{
  fireEvent.click(
    BuyButton(),
  );
};
