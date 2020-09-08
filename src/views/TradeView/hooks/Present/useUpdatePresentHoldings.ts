import {
  useCallback,
} from "react";
import {
  useRecoilState,
} from "recoil";
import {
  PresentHoldingType,
} from "trade-types";

import {
  presentHoldingsState,
} from "store/Atoms";

type UpdatePresentHoldingsHook = {
  updatePresentHoldings: (holding: PresentHoldingType) => void;
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
      holding: PresentHoldingType,
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
