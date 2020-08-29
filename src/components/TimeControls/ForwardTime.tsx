import React, {
  useMemo,
} from "react";
import {
  HistoricalPrice,
} from "iex-cloud";

import {
  DateFormats,
  formatDate,
} from "utils/Utilities";

import {
  StyledButton,
  StyledContainer,
  StyledText,
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
    <StyledContainer>
      <StyledText>
        {
`Today is ${safeDate ||
                     "..."}`
        }
      </StyledText>
      <StyledButton onClick={handleContinue} />
    </StyledContainer>
  );
};

export default TimeControl;
