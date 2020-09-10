import {
  waitFor,
} from "@testing-library/react";

import {
  Spinners,
} from "tests/Components";

export const pageShouldLoad = () =>
{
  return waitFor(
    () =>
    {
      return expect(
        Spinners(),
      ).toHaveLength(
        0,
      );
    },
    {
      timeout: 5000,
    },
  );
};
