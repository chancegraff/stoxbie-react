import {
  Dispatch,
  useEffect,
} from "react";

import {
  handleUnloadCreator,
} from "utils/Utilities";

export const useUnload = (
  ...args: Dispatch<any>[]
) =>
{
  useEffect(
    () =>
    {
      return handleUnloadCreator(
        args,
      );
    },
    [
      args,
    ],
  );
};
