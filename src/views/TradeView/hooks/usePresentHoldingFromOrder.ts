import {
  useCallback,
} from "react";
import {
  OpenedHolding,
  OpenOrder,
} from "holding-types";
import {
  useRecoilValue,
} from "recoil";

import {
  presentPriceState,
} from "store/Selectors";

type PresentHoldingFromOrderHook = {
  presentHoldingFromOrder: (open: OpenOrder | undefined) => OpenedHolding | undefined;
};

/**
 * @description Creates a new present holding from order and returns it
 * @returns {OpenedHolding | undefined} New holding created from order
 */
export const usePresentHoldingFromOrder = (): PresentHoldingFromOrderHook =>
{
  const presentPrice = useRecoilValue(
    presentPriceState,
  );

  const presentHoldingFromOrder = useCallback(
    (
      open: OpenOrder | undefined,
    ): OpenedHolding | undefined =>
    {
      if (!open ||
          !presentPrice)
      {
        return;
      }

      const {
        symbol: ticker,
      } = presentPrice;

      const holding: OpenedHolding = {
        ticker,
        open,
      };

      return holding;
    },
    [
      presentPrice,
    ],
  );

  return {
    presentHoldingFromOrder,
  };
};
