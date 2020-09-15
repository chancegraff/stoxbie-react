import {
  useCallback,
} from "react";
import {
  addBusinessDays,
} from "date-fns";

import {
  useRedirectToDate,
} from "utils/Hooks";

type SubmitContinueHook = {
  submitContinue: () => void;
};

/**
 * @description Moves time forward to next day
 * @param {Date | undefined} date Current date to move from
 * @returns {SubmitContinueHook} Callback to move time forward
 */
export const useSubmitContinue = (
  date: Date | undefined,
): SubmitContinueHook =>
{
  const {
    redirectToDate,
  } = useRedirectToDate();

  const submitContinue = useCallback(
    () =>
    {
      if (!date)
      {
        return;
      }

      const nextDate = addBusinessDays(
        date,
        1,
      );

      redirectToDate(
        nextDate,
      );
    },
    [
      date,
      redirectToDate,
    ],
  );

  return {
    submitContinue,
  };
};
