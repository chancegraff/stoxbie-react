import {
  fireEvent,
} from "@testing-library/react";

import {
  ContinueButton,
} from "./components";

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
