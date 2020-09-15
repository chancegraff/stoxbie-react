import {
  useCallback,
} from "react";
import {
  List,
} from "immutable";
import {
  useSetRecoilState,
} from "recoil";

import {
  presentHoldingsState,
} from "store/Atoms";

type ClearPresentHoldingsHook = {
  clearPresentHoldings: () => void;
};

/**
 * @description Removes all existing values in present holdings list
 * @returns {ClearPresentHoldingsHook} Callback to remove all present holdings
 */
export const useClearPresentHoldings = (): ClearPresentHoldingsHook =>
{
  const setPresentHoldings = useSetRecoilState(
    presentHoldingsState,
  );

  const clearPresentHoldings = useCallback(
    () =>
    {
      setPresentHoldings(
        List(),
      );
    },
    [
      setPresentHoldings,
    ],
  );

  return {
    clearPresentHoldings,
  };
};
