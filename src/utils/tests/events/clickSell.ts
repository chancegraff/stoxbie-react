import {
  fireEvent,
} from "@testing-library/react";

import {
  SellButton,
} from "utils/Components";

export const clickSell = () =>
{
  fireEvent.click(
    SellButton(),
  );
};
