import userEvent from "@testing-library/user-event";

import {
  TablePresentRow,
} from "tests/Components";

export const hoverPresentRow = () =>
{
  userEvent.hover(
    TablePresentRow(),
  );
};
