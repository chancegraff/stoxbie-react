import React from "react";
import moment from "moment";
import { styled } from "styletron-react";
import { Button, ButtonProps, SHAPE, KIND, SIZE } from "baseui/dist/button";
import { ButtonGroup } from "baseui/dist/button-group";
import { StatefulCalendar } from "baseui/dist/datepicker";
import { TriangleDown, Filter } from "baseui/dist/icon";
import { FormControl } from "baseui/dist/form-control";
import { Block } from "baseui/dist/block";
import { StatefulPopover } from "components/BaseUI/Popover";
import { StatefulMenu } from "components/BaseUI/Menu";
import { copyPropsToChildren } from "services/Utilities";
import { NestedMenus } from "baseui/dist/menu";

type Props = {
  mobile?: boolean;
};

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

const MOBILE_MENU_ITEMS = [
  { label: "1Y" },
  { label: "5Y" },
  {
    label: (
      <DatePicker>
        <Filter size={16} />
      </DatePicker>
    ),
  },
];

const MobileMenu: React.FC<Props> = () => (
  <StatefulPopover
    placement="bottom"
    content={
      <NestedMenus>
        <StatefulMenu items={MOBILE_MENU_ITEMS} />
      </NestedMenus>
    }
  >
    <Block>
      <Button
        size={SIZE.compact}
        kind={KIND.secondary}
        shape={SHAPE.pill}
        endEnhancer={<TriangleDown size={18} />}
      >
        Trade
      </Button>
    </Block>
  </StatefulPopover>
);

const TradeStart: React.FC<Props> = (props) => {
  if (props.mobile) {
    return <MobileMenu />;
  }
  return (
    <Block marginTop="30px">
      <FormControl caption="Pick Start Date">
        <ButtonGroup>
          <GrowingButton>One Year Ago</GrowingButton>
          <GrowingButton>Five Years Ago</GrowingButton>
          <DatePicker>
            <GrowingButton endEnhancer={<TriangleDown size={18} />}>
              Custom
            </GrowingButton>
          </DatePicker>
        </ButtonGroup>
      </FormControl>
    </Block>
  );
};

export default TradeStart;
