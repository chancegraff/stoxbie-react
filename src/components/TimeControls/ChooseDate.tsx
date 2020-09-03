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
  GrommetButton,
  GrommetButtonChild,
  GrommetButtonText,
  GrommetContainer,
  StoxbieDropCalendar,
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
    <GrommetContainer css="">
      <GrommetButton
        css=""
        onClick={handleOneYearStart}
      >
        <GrommetButtonChild css="">
          <GrommetButtonText css="">
            1Y
          </GrommetButtonText>
        </GrommetButtonChild>
      </GrommetButton>
      <GrommetButton
        css=""
        onClick={handleFiveYearStart}
      >
        <GrommetButtonChild css="">
          <GrommetButtonText css="">
            5Y
          </GrommetButtonText>
        </GrommetButtonChild>
      </GrommetButton>
      <StoxbieDropCalendar
        css=""
        handleSelect={handleCustomYearStart}
      >
        <GrommetButtonChild css="">
          <Schedule
            css=""
            size="14px"
          />
        </GrommetButtonChild>
      </StoxbieDropCalendar>
    </GrommetContainer>
  );
};

export default TradeStart;
