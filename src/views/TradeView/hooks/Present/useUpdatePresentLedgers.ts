import {
  useCallback,
} from "react";
import {
  useRecoilState,
} from "recoil";
import {
  LedgerType,
} from "trade-types";

import {
  presentLedgersState,
} from "store/Atoms";

type UpdatePresentLedgersHook = {
  updatePresentLedgers: (ledger: LedgerType) => void;
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
      ledger: LedgerType,
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
