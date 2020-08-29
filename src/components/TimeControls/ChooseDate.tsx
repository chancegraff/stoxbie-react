import React, {
  useCallback,
} from "react";
import {
  Schedule,
} from "grommet-icons";

import {
  DateFormats,
  fiveYearsAgo,
  formatDate,
  oneYearAgo,
} from "utils/Utilities";

import {
  StyledButton,
  StyledButtonChild,
  StyledButtonText,
  StyledContainer,
  StyledDropCalendar,
} from "./ChooseDate.styled";

type Props = {
  handleStart: (date: string) => void;
};

const TradeStart: React.FC<Props> = (
  {
    handleStart,
  },
) =>
{
  const handleYearStart = useCallback(
    (
      date: string,
    ) =>
    {
      return handleStart(
        date,
      );
    },
    [
      handleStart,
    ],
  );
  const handleOneYearStart = useCallback(
    () =>
    {
      return handleYearStart(
        formatDate(
          oneYearAgo,
          DateFormats.Url,
        ),
      );
    },
    [
      handleYearStart,
    ],
  );
  const handleFiveYearStart = useCallback(
    () =>
    {
      return handleYearStart(
        formatDate(
          fiveYearsAgo,
          DateFormats.Url,
        ),
      );
    },
    [
      handleYearStart,
    ],
  );
  const handleCustomYearStart = useCallback(
    (
      nextDate,
    ) =>
    {
      return handleYearStart(
        formatDate(
          nextDate,
          DateFormats.Url,
        ),
      );
    },
    [
      handleYearStart,
    ],
  );

  return (
    <StyledContainer>
      <StyledButton onClick={handleOneYearStart}>
        <StyledButtonChild>
          <StyledButtonText>
            1Y
          </StyledButtonText>
        </StyledButtonChild>
      </StyledButton>
      <StyledButton onClick={handleFiveYearStart}>
        <StyledButtonChild>
          <StyledButtonText>
            5Y
          </StyledButtonText>
        </StyledButtonChild>
      </StyledButton>
      <StyledDropCalendar handleSelect={handleCustomYearStart}>
        <StyledButtonChild>
          <Schedule size="14px" />
        </StyledButtonChild>
      </StyledDropCalendar>
    </StyledContainer>
  );
};

export default TradeStart;
