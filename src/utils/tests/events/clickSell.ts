import {
  fireEvent,
} from "@testing-library/react";

import {
  SellButton,
} from "utils/tests/Components";

export const clickSell = () =>
{
  fireEvent.click(
    SellButton(),
  );
};
