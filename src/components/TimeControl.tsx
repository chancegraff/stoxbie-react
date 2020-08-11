import React, {
  useMemo,
} from "react";
import {
  SIZE,
} from "baseui/dist/button";
import {
  LabelMedium,
} from "baseui/dist/typography";
import {
  HistoricalPrice,
} from "iex";

import {
  DateFormats, formatDate,
} from "services/Utilities";

import {
  Container,
  FullButton,
} from "./TimeControl.styled";

type Props = {
  currentPrice?: HistoricalPrice;
  handleContinue: () => void;
};

const TimeControl: React.FC<Props> = (
  {
    handleContinue,
    currentPrice,
  },
) =>
{
  const safeDate = useMemo(
    () =>
    {
      if (currentPrice)
      {
        return formatDate(
          currentPrice.date,
          DateFormats.Full,
        );
      }
    },
    [
      currentPrice,
    ],
  );

  return (
    <Container>
      <LabelMedium
        paddingBottom="10px"
      >
        {`Today is ${safeDate || "..."}`}
      </LabelMedium>
      <FullButton
        size={SIZE.large}
        onClick={handleContinue}
      >
        Continue
      </FullButton>
    </Container>
  );
};

export default TimeControl;
