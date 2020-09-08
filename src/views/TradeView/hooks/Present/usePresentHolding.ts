import {
  useCallback,
} from "react";
import {
  useRecoilValue,
} from "recoil";

import {
  presentPriceState,
} from "store/Selectors";

import {
  usePresentOrder,
} from "./usePresentOrder";

type PresentHoldingHook = {
  PresentHolding: (amount: number) => PresentHolding | undefined;
};

/**
 * @description Creates a new present holding from order and returns it
 * @returns {PresentHolding | undefined} New holding created from order
 */
export const usePresentHolding = (): PresentHoldingHook =>
{
  const {
    PresentOrder,
  } = usePresentOrder();

  const presentPrice = useRecoilValue(
    presentPriceState,
  );

  const PresentHolding = useCallback(
    (
      amount: number,
    ): PresentHolding | undefined =>
    {
      if (!presentPrice)
      {
        return;
      }

      const present = PresentOrder(
        amount,
      );

      if (!present)
      {
        return;
      }

      const {
        symbol: ticker,
      } = presentPrice;

      const holding: PresentHolding = {
        ticker,
        present,
      };

      return holding;
    },
    [
      PresentOrder,
      presentPrice,
    ],
  );

  return {
    PresentHolding,
  };
};
