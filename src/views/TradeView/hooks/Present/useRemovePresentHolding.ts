import {
  useCallback,
} from "react";
import {
  useRecoilState,
} from "recoil";

import {
  presentHoldingsState,
} from "store/Atoms";

type RemovePresentHoldingHook = {
  removePresentHolding: (holding: PresentHolding) => void;
};

/**
 * @description Removes an existing present holding from state
 * @returns {RemovePresentHoldingHook} Callback to remove present holding
 */
export const useRemovePresentHolding = (): RemovePresentHoldingHook =>
{
  const [
    presentHoldings,
    setPresentHoldings,
  ] = useRecoilState(
    presentHoldingsState,
  );

  const removePresentHolding = useCallback(
    (
      holding: PresentHolding,
    ) =>
    {
      setPresentHoldings(
        presentHoldings.delete(
          presentHoldings.indexOf(
            holding,
          ),
        ),
      );
    },
    [
      presentHoldings,
      setPresentHoldings,
    ],
  );

  return {
    removePresentHolding,
  };
};
