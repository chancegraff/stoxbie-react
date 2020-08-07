import React from "react";
import { Override } from "baseui/dist/overrides";
import {
  Overrides,
  PopoverProps,
  StatefulPopover as DefaultStatefulPoover,
} from "baseui/dist/popover";

const Body: Override<unknown> = {
  style: {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 8px",
    padding: "0",
  },
};

const overrides: Overrides = { Body };

export const StatefulPopover: React.FC<Partial<PopoverProps>> = ({
  children,
  ...props
}) =>
{
  return (
    <DefaultStatefulPoover
      animateOutTime={300}
      autoFocus={true}
      overrides={overrides}
      returnFocus={true}
      {...props}
    >
      {children}
    </DefaultStatefulPoover>
  );
};
