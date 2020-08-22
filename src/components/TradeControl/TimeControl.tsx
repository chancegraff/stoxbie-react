import React, {
  useMemo,
} from "react";
import {
  HistoricalPrice,
} from "iex-cloud";

import {
  DateFormats, formatDate,
} from "utils/Utilities";

import {
  StyledButton,
  StyledContainer,
  StyledText,
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
    <StyledContainer>
      <StyledText>
        {`Today is ${safeDate || "..."}`}
      </StyledText>
      <StyledButton onClick={handleContinue} />
    </StyledContainer>
  );
};

export default TimeControl;
