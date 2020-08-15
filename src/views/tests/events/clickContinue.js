import {
  fireEvent,
} from "@testing-library/react";

import ContinueButton from "views/tests/elements/ContinueButton";

const clickContinue = (
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

export default clickContinue;
