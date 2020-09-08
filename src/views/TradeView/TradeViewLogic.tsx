import React, {
  useMemo,
} from "react";

import {
  DateFormats,
  parseDate,
} from "utils/Utilities";

import TradeViewDisplay from "./TradeViewDisplay";
import {
  useAspectRatio,
  useEffectPresentPrices,
  useSubmitClose,
  useSubmitContinue,
  useSubmitOpen,
} from "./TradeViewHooks";

type Props = {
  date: string | undefined;
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
  },
) =>
{
  const {
    chartRef,
    chartWidth,
    chartHeight,
  } = useAspectRatio<HTMLDivElement>();

  const parsedDate = useMemo(
    () =>
    {
      if (!date)
      {
        return;
      }

      return parseDate(
        date,
        DateFormats.Url,
      );
    },
    [
      date,
    ],
  );

  const {
    submitClose,
  } = useSubmitClose();
  const {
    submitOpen,
  } = useSubmitOpen();
  const {
    submitContinue,
  } = useSubmitContinue(
    parsedDate,
  );

  useEffectPresentPrices(
    parsedDate,
  );

  return (
    <TradeViewDisplay
      chartRef={chartRef}
      chartWidth={chartWidth}
      chartHeight={chartHeight}
      handleOpen={submitOpen}
      handleClose={submitClose}
      handleContinue={submitContinue}
    />
  );
};

export default TradeViewLogic;
