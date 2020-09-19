import React, {
  useMemo,
} from "react";
import {
  HistoricalPrice,
} from "@chancey/iex-cloud";

import {
  DateFormat,
  formatParsedDate,
} from "utils/Utilities";
import Spinner from "components/Grommet/Spinner";

import {
  GrommetButton,
  GrommetContainer,
  GrommetText,
} from "./ForwardTime.styled";

type Props = {
  presentPrice: HistoricalPrice | undefined;
  handleContinue: () => void;
};

const ForwardTime: React.FC<Props> = (
  {
    handleContinue,
    presentPrice,
  },
) =>
{
  const safeDate = useMemo(
    () =>
    {
      if (!presentPrice)
      {
        return;
      }

      return formatParsedDate(
        presentPrice.date,
        DateFormat.Iex,
        DateFormat.Full,
      );
    },
    [
      presentPrice,
    ],
  );

  if (!presentPrice)
  {
    return (
      <Spinner
        css=""
        Container={GrommetContainer}
      />
    );
  }

  return (
    <GrommetContainer
      css=""
      data-testid="priceDate"
    >
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

export default ForwardTime;
