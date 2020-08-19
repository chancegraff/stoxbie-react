import React, {
  useCallback,
} from "react";
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
  Box, Button,
} from "grommet";

import {
  DateFormats,
  fiveYearsAgo,
  formatDate,
  oneYearAgo,
} from "utils/Utilities";
import DatePicker from "components/BaseUI/DatePicker";

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
    <Box>
      <ButtonGroup
        shape={SHAPE.pill}
        size={SIZE.mini}
      >
        <Button onClick={handleOneYearStart}>
          1Y
        </Button>
        <Button onClick={handleFiveYearStart}>
          5Y
        </Button>
        <DatePicker onChange={handleCustomYearStart}>
          <Button>
            <Filter />
          </Button>
        </DatePicker>
      </ButtonGroup>
    </Box>
  );
};

export default TradeStart;
