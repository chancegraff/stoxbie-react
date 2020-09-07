import React from "react";

import TradeViewDisplay from "./TradeViewDisplay";
import {
  useAspectRatio,
  useEffectPresentPrices,
  useSubmitContinue,
  useSubmitOrder,
} from "./TradeViewHooks";

type Props = {
  date: Date;
  ticker: string;
};

/**
 * @description Contains view logic for trading page
 * @returns {React.FC<Props>} A React component
 *
 * @todo Connect createPersistedState to recoil's state
 * @see https://recoiljs.org/docs/guides/persistence#saving-state
 */
const TradeViewLogic: React.FC<Props> = (
  {
    date,
    ticker,
  },
) =>
{
  const {
    chartRef,
    chartWidth,
    chartHeight,
  } = useAspectRatio<HTMLDivElement>();
  const {
    submitOrder,
  } = useSubmitOrder();
  const {
    submitContinue,
  } = useSubmitContinue(
    date,
  );

  useEffectPresentPrices(
    date,
  );

  return (
    <TradeViewDisplay
      chartRef={chartRef}
      chartWidth={chartWidth}
      chartHeight={chartHeight}
      handleOrder={submitOrder}
      handleContinue={submitContinue}
    />
  );
};

export default TradeViewLogic;
