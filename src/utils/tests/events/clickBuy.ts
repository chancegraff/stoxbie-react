import {
  fireEvent,
} from "@testing-library/react";

import {
  BuyButton,
} from "utils/Components";

export const clickBuy = () =>
{
  fireEvent.click(
    BuyButton(),
  );
};
