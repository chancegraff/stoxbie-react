import userEvent from "@testing-library/user-event";

import {
  TableToggleCombined,
} from "tests/Components";

export const clickToggleCombined = () =>
{
  const toggleCombined = TableToggleCombined();

  if (!toggleCombined)
  {
    return undefined;
  }

  userEvent.click(
    toggleCombined,
  );
};
