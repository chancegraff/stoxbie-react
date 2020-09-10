import userEvent from "@testing-library/user-event";

import {
  ContinueButton,
} from "tests/Components";

export const clickContinue = (
  times = 1,
) =>
{
  Array.from(
    Array(
      times,
    ),
    () =>
    {
      return userEvent.click(
        ContinueButton(),
      );
    },
  );
};
