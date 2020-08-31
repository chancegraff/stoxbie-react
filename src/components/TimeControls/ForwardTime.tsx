import React, {
  useMemo,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";

import {
  DateFormats,
  formatDate,
} from "utils/Utilities";

import {
  GrommetButton,
  GrommetContainer,
  GrommetText,
} from "./ForwardTime.styled";

type Props = {
  presentPrice: HistoricalPrice | undefined;
  handleContinue: () => void;
};

const TimeControl: React.FC<Props> = (
  {
    handleContinue,
    presentPrice,
  },
) =>
{
  const safeDate = useMemo(
    () =>
    {
      if (presentPrice)
      {
        return formatDate(
          presentPrice.date,
          DateFormats.Full,
        );
      }
    },
    [
      presentPrice,
    ],
  );

  return (
    <GrommetContainer css="">
      <GrommetText css="">
        {
          `Today is ${safeDate ||
                      "..."}`
        }
      </GrommetText>
      <GrommetButton
        css=""
        onClick={handleContinue}
      />
    </GrommetContainer>
  );
};

export default TimeControl;
