import {
  fireEvent,
} from "@testing-library/react";

import {
  SellButton,
} from "tests/Components";

export const clickSell = () =>
{
  fireEvent.click(
    SellButton(),
  );
};
