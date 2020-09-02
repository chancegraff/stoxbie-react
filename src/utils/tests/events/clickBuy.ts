import {
  fireEvent,
} from "@testing-library/react";

import {
  BuyButton,
} from "utils/tests/Components";

export const clickBuy = () =>
{
  fireEvent.click(
    BuyButton(),
  );
};
