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
  StyledContainer,
} from "./ChooseDate.styled";

type Props = {
  handleStart: (date: string) => void;
};

// TODO Replace DatePicker with Grommet
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
          DateFormats.URL,
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
          DateFormats.URL,
        ),
      );
    },
    [
      handleYearStart,
    ],
  );
  const handleCustomYearStart = useCallback(
    (
      {
        date,
      },
    ) =>
    {
      return handleYearStart(
        formatDate(
          date,
          DateFormats.URL,
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
        1Y
      </StyledButton>
      <StyledButton onClick={handleFiveYearStart}>
        5Y
      </StyledButton>
      <StyledButton>
        <Schedule size="14px" />
      </StyledButton>
      {/* <DatePicker onChange={handleCustomYearStart}>
        <StyledButton>
          <Schedule size="14px" />
        </StyledButton>
      </DatePicker> */}
    </StyledContainer>
  );
};

export default TradeStart;
