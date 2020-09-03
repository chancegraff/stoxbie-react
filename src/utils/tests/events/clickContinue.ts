import {
  fireEvent,
} from "@testing-library/react";

import {
  ContinueButton,
} from "utils/Components";

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
      return fireEvent.click(
        ContinueButton(),
      );
    },
  );
};
