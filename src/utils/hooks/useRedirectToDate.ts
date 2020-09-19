import {
  useCallback,
} from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom";

import {
  DateFormat,
  formatDate,
} from "utils/Utilities";

type RedirectToDateHook = {
  redirectToDate: (date: Date) => void;
};

/**
 * @description Redirects to date provided
 * @param {Date} date Date to redirect to
 * @returns {void} Nothing
 */
export const useRedirectToDate = (): RedirectToDateHook =>
{
  const location = useLocation();
  const history = useHistory();

  const redirectToDate = useCallback(
    (
      date: Date,
    ) =>
    {
      const nextDate = formatDate(
        date,
        DateFormat.Url,
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

      history.replace(
        `${pathnames}/${nextDate}`,
      );
    },
    [
      history,
      location,
    ],
  );

  return {
    redirectToDate,
  };
};
