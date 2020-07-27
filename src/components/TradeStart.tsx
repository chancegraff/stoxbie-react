import React from "react";
import moment from "moment";
import { styled } from "styletron-react";
import { Button, ButtonProps } from "baseui/dist/button";
import { ButtonGroup } from "baseui/dist/button-group";
import { StatefulCalendar } from "baseui/dist/datepicker";
import { TriangleDown, Filter } from "baseui/dist/icon";
import { FormControl } from "baseui/dist/form-control";
import { Block } from "baseui/dist/block";
import { StatefulPopover } from "components/BaseUI/Popover";
import { copyPropsToChildren } from "services/Utilities";

type Props = unknown;

const today = moment().toDate();
const oneYear = moment().subtract(1, "year").toDate();
const fiveYear = moment().subtract(5, "years").toDate();

const GrowingButton = styled(Button, { flexGrow: 1 });

const DatePicker: React.FC<ButtonProps> = (props) => (
  <StatefulPopover
    placement="bottomLeft"
    content={<StatefulCalendar maxDate={today} />}
  >
    {copyPropsToChildren(props)}
  </StatefulPopover>
);

const TradeStart: React.FC<Props> = (props) => {
  return (
    <Block marginTop="30px">
      <FormControl caption="Pick Start Date">
        <ButtonGroup>
          <GrowingButton>1Y</GrowingButton>
          <GrowingButton>5Y</GrowingButton>
          <DatePicker>
            <GrowingButton>
              <Filter />
            </GrowingButton>
          </DatePicker>
        </ButtonGroup>
      </FormControl>
    </Block>
  );
};

export default TradeStart;
