import userEvent from "@testing-library/user-event";

import {
  OrderButton,
} from "tests/Components";

export const clickOrder = () =>
{
  userEvent.click(
    OrderButton(),
  );
};
