import {
  useCallback,
} from "react";
import {
  Direction,
  OpenedHolding,
  Order,
} from "holding-types";

import {
  useCloseHolding,
} from "./useCloseHolding";
import {
  useOpenHolding,
} from "./useOpenHolding";

type SubmitOrderHook = {
  submitOrder: (order: Order) => void;
};

/**
 * @todo Finish closeHolding
 * @todo Change order controls to only create new holdings
 * @todo Change order slider to be positive and negative and remove direction props
 * @todo Reduce order control buttons to single button with value "order"
 * @todo Remove order control button toggling
 * @todo Rename "submitOrder" to "submitOpen" and connect to order control button
 *       (maybe just replace it entirely with "openHolding"?)
 * @todo Create new hook called "submitClose" and connect to exit buttons in table
 *       (same as above; maybe just replace with "closeHolding"?)
 *
 * @summary How short selling "works"
 * I have $0 and 0 shares
 * I sell 1 share at $100
 *  I have -$100 and -1 shares << -$100 / +1
 * I buy 1 share at $50
 *  I have $50 and 0 shares << +$150 / -1
 *
 * Go to broker and take 1 share at $100 for promise
 *  Return at lower price, keep difference per share
 *  Return at higher price, give difference per share
 *
 * @description Determines order direction and opens or closes holding
 * @returns {void} Nothing
 */
export const useSubmitOrder = (): SubmitOrderHook =>
{
  const {
    openHolding,
  } = useOpenHolding();
  const {
    closeHolding,
  } = useCloseHolding();

  const submitOrder = useCallback(
    (
      order: Order,
    ) =>
    {
      return undefined;
    },
    [],
  );

  return {
    submitOrder,
  };
};

// const handleSubmit = useCallback(
//   (
//     sharePrice: number,
//     shareCount: number,
//   ) =>
//   {
//     const currentTradeType = shareCount / Math.abs(
//       shareCount,
//     );
//     const previousTradeOpposite = highestPresentHolding &&
//                                   highestPresentHolding.openDirection * -1;

//     if (currentTradeType === previousTradeOpposite)
//     {
//       closeTrade(
//         sharePrice,
//         shareCount,
//       );
//     }
//     else
//     {
//       openTrade(
//         sharePrice,
//         shareCount,
//       );
//     }
//   },
//   [
//     highestPresentHolding,
//     openTrade,
//     closeTrade,
//   ],
// );
