import React, { useCallback } from "react";
import moment from "moment";
import { styled } from "styletron-react";
import { Button, ButtonProps, SIZE, SHAPE } from "baseui/dist/button";
import { ButtonGroup } from "baseui/dist/button-group";
import { StatefulCalendar, onChange } from "baseui/dist/datepicker";
import { Filter } from "baseui/dist/icon";
import { Block } from "baseui/dist/block";
import { StatefulPopover } from "components/BaseUI/Popover";
import { copyPropsToChildren } from "services/Utilities";

const today = moment();
const oneYear = moment().subtract(1, "year");
const fiveYear = moment().subtract(5, "years");

const GrowingButton = styled(Button, { flexGrow: 1 });

type DatePickerProps = ButtonProps & {
  onChange?: onChange;
};

const DatePicker: React.FC<DatePickerProps> = ({ onChange, ...props }) => (
  <StatefulPopover
    placement="bottomLeft"
    content={
      <StatefulCalendar
        maxDate={today.toDate()}
        minDate={fiveYear.toDate()}
        initialState={{ value: oneYear.toDate() }}
        onChange={onChange}
      />
    }
  >
    {copyPropsToChildren(props)}
  </StatefulPopover>
);

type Props = {
  handleStart: (date: string) => void;
};

const TradeStart: React.FC<Props> = ({ handleStart }) => {
  const handleYearStart = useCallback((date: string) => handleStart(date), [
    handleStart,
  ]);
  const handleOneYearStart = useCallback(
    () => handleYearStart(oneYear.format("[m]MM[d]DD[y]YYYY")),
    [handleYearStart]
  );
  const handleFiveYearStart = useCallback(
    () => handleYearStart(fiveYear.format("[m]MM[d]DD[y]YYYY")),
    [handleYearStart]
  );
  const handleCustomYearStart = useCallback(
    ({ date }) => handleYearStart(moment(date).format("[m]MM[d]DD[y]YYYY")),
    [handleYearStart]
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
