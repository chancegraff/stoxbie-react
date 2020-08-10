import React, { useMemo } from "react";
import { SIZE } from "baseui/dist/button";
import { LabelMedium } from "baseui/dist/typography";
import {
  format,
  parseISO,
} from "date-fns";
import { HistoricalPrice } from "iex";

import {
  Container,
  FullButton,
} from "./TimeControl.styled";

type Props = {
  currentPrice?: HistoricalPrice;
  handleContinue: () => void;
};

const TimeControl: React.FC<Props> = ({
  handleContinue,
  currentPrice,
}) =>
{
  const safeDate = useMemo(
    () =>
    {
      if (currentPrice)
      {
        const asDate = parseISO(currentPrice.date);

        return format(
          asDate,
          "MMMM do, y",
        );
      }
    },
    [ currentPrice ],
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
