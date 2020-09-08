import {
  useCallback,
} from "react";
import {
  useHistory,
  useLocation,
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
 * @param {Date | undefined} date Current date to move from
 * @returns {SubmitContinueHook} Callback to move time forward
 */
export const useSubmitContinue = (
  date: Date | undefined,
): SubmitContinueHook =>
{
  const location = useLocation();
  const history = useHistory();

  const submitContinue = useCallback(
    () =>
    {
      if (!date)
      {
        return;
      }

      const nextDate = formatDate(
        addDays(
          date,
          1,
        ),
        DateFormats.Url,
      );

      const pathnames = location.pathname
        .split(
          "/",
        )
        .slice(
          0,
          -1,
        )
        .join(
          "/",
        );

      history.push(
        `${pathnames}/${nextDate}`,
      );
    },
    [
      history,
      location,
      date,
    ],
  );

  return {
    submitContinue,
  };
};
