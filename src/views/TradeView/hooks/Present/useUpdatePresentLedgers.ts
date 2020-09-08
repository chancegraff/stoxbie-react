import {
  useCallback,
} from "react";
import {
  useRecoilState,
} from "recoil";

import {
  presentLedgersState,
} from "store/Atoms";

type UpdatePresentLedgersHook = {
  updatePresentLedgers: (ledger: Ledger) => void;
};

/**
 * @description Creates a new present ledger and adds it to state
 * @returns {void} Nothing
 */
export const useUpdatePresentLedgers = (): UpdatePresentLedgersHook =>
{
  const [
    presentLedgers,
    setPresentLedgers,
  ] = useRecoilState(
    presentLedgersState,
  );

  const updatePresentLedgers = useCallback(
    (
      ledger: Ledger,
    ) =>
    {
      setPresentLedgers(
        presentLedgers.unshift(
          ledger,
        ),
      );
    },
    [
      presentLedgers,
      setPresentLedgers,
    ],
  );

  return {
    updatePresentLedgers,
  };
};
