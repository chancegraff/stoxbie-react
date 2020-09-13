import userEvent from "@testing-library/user-event";

import {
  TableToggleCombined,
} from "tests/Components";

export const clickToggleCombined = () =>
{
  userEvent.click(
    TableToggleCombined(),
  );
};
