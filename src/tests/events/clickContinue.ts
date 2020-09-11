import userEvent from "@testing-library/user-event";

import {
  ContinueButton,
} from "tests/Components";

export const clickContinue = () =>
{
  return userEvent.click(
    ContinueButton(),
  );
};
