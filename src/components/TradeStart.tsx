import { Block } from "baseui/dist/block";
import { Button, ButtonProps, SHAPE, SIZE } from "baseui/dist/button";
import { ButtonGroup } from "baseui/dist/button-group";
import { onChange as defaultHandler, StatefulCalendar } from "baseui/dist/datepicker";
import { Filter } from "baseui/dist/icon";
import { StatefulPopover } from "components/BaseUI/Popover";
import { format, subYears } from "date-fns";
import React, { useCallback } from "react";
import { URL_DATE_FORMAT } from "services/Constants";
import { copyPropsToChildren } from "services/Utilities";
import { styled } from "styletron-react";

const today = new Date();
const oneYear = subYears(
  today,
  1,
);
const fiveYear = subYears(
  today,
  5,
);

const GrowingButton = styled(
  Button,
  {
    flexGrow: 1,
  },
);

type onChange = (args: { date: Date }) => void;

type DatePickerProps = ButtonProps & {
  onChange?: onChange;
};

const DatePicker: React.FC<DatePickerProps> = (
  {
    onChange, ...props
  },
) => (
  <StatefulPopover
    placement="bottomLeft"
    content={
      <StatefulCalendar
        maxDate={today}
        minDate={fiveYear}
        initialState={{
          value: oneYear,
        }}
        onChange={onChange as defaultHandler}
      />
    }
  >
    {copyPropsToChildren(
      props,
    )}
  </StatefulPopover>
);

type Props = {
  handleStart: (date: string) => void;
};

const TradeStart: React.FC<Props> = (
  {
    handleStart,
  },
) => {
  const handleYearStart = useCallback(
    (
      date: string,
    ) => handleStart(
      date,
    ),
    [handleStart],
  );
  const handleOneYearStart = useCallback(
    () => handleYearStart(
      format(
        oneYear,
        URL_DATE_FORMAT,
      ),
    ),
    [handleYearStart],
  );
  const handleFiveYearStart = useCallback(
    () => handleYearStart(
      format(
        fiveYear,
        URL_DATE_FORMAT,
      ),
    ),
    [handleYearStart],
  );
  const handleCustomYearStart: onChange = useCallback(
    (
      {
        date,
      },
    ) => handleYearStart(
      format(
        date,
        URL_DATE_FORMAT,
      ),
    ),
    [handleYearStart],
  );

  return (
    <Block>
      <ButtonGroup size={SIZE.mini} shape={SHAPE.pill}>
        <GrowingButton onClick={handleOneYearStart}>1Y</GrowingButton>
        <GrowingButton onClick={handleFiveYearStart}>5Y</GrowingButton>
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
