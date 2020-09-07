import {
  useCallback,
} from "react";
import {
  OpenedHolding,
} from "holding-types";
import {
  useRecoilState,
} from "recoil";

import {
  presentHoldingsState,
} from "store/Atoms";

type UpdatePresentHoldingsHook = {
  updatePresentHoldings: (holding: OpenedHolding) => void;
};

/**
 * @description Creates a new present holding and adds it to state
 * @returns {void} Nothing
 */
export const useUpdatePresentHoldings = (): UpdatePresentHoldingsHook =>
{
  const [
    presentHoldings,
    setPresentHoldings,
  ] = useRecoilState(
    presentHoldingsState,
  );

  const updatePresentHoldings = useCallback(
    (
      holding: OpenedHolding,
    ) =>
    {
      setPresentHoldings(
        presentHoldings.unshift(
          holding,
        ),
      );
    },
    [
      presentHoldings,
      setPresentHoldings,
    ],
  );

  return {
    updatePresentHoldings,
  };
};
