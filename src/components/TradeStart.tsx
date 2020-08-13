import React, {
  useCallback,
} from "react";
import {
  Block,
} from "baseui/dist/block";
import {
  SHAPE, SIZE,
} from "baseui/dist/button";
import {
  ButtonGroup,
} from "baseui/dist/button-group";
import {
  Filter,
} from "baseui/dist/icon";

import {
  DateFormats,
  fiveYearsAgo,
  formatDate,
  oneYearAgo,
} from "utils/Utilities";
import DatePicker from "components/BaseUI/DatePicker";

import {
  GrowingButton,
} from "./TradeStart.styled";

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
    <Block>
      <ButtonGroup
        shape={SHAPE.pill}
        size={SIZE.mini}
      >
        <GrowingButton onClick={handleOneYearStart}>
          1Y
        </GrowingButton>
        <GrowingButton onClick={handleFiveYearStart}>
          5Y
        </GrowingButton>
        <DatePicker onChange={handleCustomYearStart}>
          <GrowingButton>
            <Filter />
          </GrowingButton>
        </DatePicker>
      </ButtonGroup>
    </Block>
  );
};

export default TradeStart;
