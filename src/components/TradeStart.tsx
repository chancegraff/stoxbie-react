import React, { useCallback } from "react";
import { Block } from "baseui/dist/block";
import {
  Button, ButtonProps, SHAPE, SIZE,
} from "baseui/dist/button";
import { ButtonGroup } from "baseui/dist/button-group";
import {
  onChange as defaultHandler,
  StatefulCalendar,
} from "baseui/dist/datepicker";
import { Filter } from "baseui/dist/icon";
import {
  format, subYears,
} from "date-fns";
import { styled } from "styletron-react";

import { URL_DATE_FORMAT } from "services/Constants";
import { copyPropsToChildren } from "services/Utilities";
import { StatefulPopover } from "components/BaseUI/Popover";

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
  { flexGrow: 1 },
);

type onChange = (args: { date: Date }) => void;

type DatePickerProps = ButtonProps & {
  onChange?: onChange;
};

const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  ...props
}) => {
  return (
    <StatefulPopover
      content={(
        <StatefulCalendar
          initialState={{ value: oneYear }}
          maxDate={today}
          minDate={fiveYear}
          onChange={onChange as defaultHandler}
        />
      )}
      placement="bottomLeft"
    >
      {copyPropsToChildren(props)}
    </StatefulPopover>
  );
};

type Props = {
  handleStart: (date: string) => void;
};

const TradeStart: React.FC<Props> = ({ handleStart }) => {
  const handleYearStart = useCallback(
    (date: string) => {
      return handleStart(date);
    },
    [ handleStart ],
  );
  const handleOneYearStart = useCallback(
    () => {
      return handleYearStart(format(
        oneYear,
        URL_DATE_FORMAT,
      ));
    },
    [ handleYearStart ],
  );
  const handleFiveYearStart = useCallback(
    () => {
      return handleYearStart(format(
        fiveYear,
        URL_DATE_FORMAT,
      ));
    },
    [ handleYearStart ],
  );
  const handleCustomYearStart: onChange = useCallback(
    ({ date }) => {
      return handleYearStart(format(
        date,
        URL_DATE_FORMAT,
      ));
    },
    [ handleYearStart ],
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
