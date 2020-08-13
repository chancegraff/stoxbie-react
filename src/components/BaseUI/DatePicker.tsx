import React from "react";
import {
  ButtonProps,
} from "baseui/dist/button";
import {
  ContainerState,
  onChange as defaultHandler,
  StatefulCalendar,
} from "baseui/dist/datepicker";
import {
  copyPropsToChildren,
} from "utils/Utilities";

import {
  StatefulPopover,
} from "components/BaseUI/Popover";

type Props = ButtonProps & {
  initialState?: ContainerState,
  maxDate?: Date;
  minDate?: Date;
  onChange?: defaultHandler;
};

const DatePicker: React.FC<Props> = (
  {
    initialState,
    maxDate,
    minDate,
    onChange,
    ...props
  },
) =>
{
  return (
    <StatefulPopover
      content={
        (
          <StatefulCalendar
            initialState={initialState}
            maxDate={maxDate}
            minDate={minDate}
            onChange={onChange}
          />
        )
      }
      placement="bottomLeft"
    >
      {
        copyPropsToChildren(
          props,
        )
      }
    </StatefulPopover>
  );
};

export default DatePicker;
