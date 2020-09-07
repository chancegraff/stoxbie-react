import {
  useCallback,
} from "react";
import {
  useHistory,
} from "react-router-dom";
import {
  addDays,
} from "date-fns";

import {
  DateFormats,
  formatDate,
} from "utils/Utilities";

type SubmitContinueHook = {
  submitContinue: () => void;
};

/**
 * @description Moves time forward to next day
 * @param {Date} date Current date to move from
 * @returns {SubmitContinueHook} Callback to move time forward
 */
export const useSubmitContinue = (
  date: Date,
): SubmitContinueHook =>
{
  const history = useHistory();

  const submitContinue = useCallback(
    () =>
    {
      const nextDate = formatDate(
        addDays(
          date,
          1,
        ),
        DateFormats.Url,
      );

      history.push(
        `/${nextDate}`,
      );
    },
    [
      history,
      date,
    ],
  );

  return {
    submitContinue,
  };
};
