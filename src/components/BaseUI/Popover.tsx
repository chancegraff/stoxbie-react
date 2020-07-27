import React from "react";
import {
  StatefulPopover as DefaultStatefulPoover,
  Overrides,
  PopoverProps,
} from "baseui/dist/popover";
import { Override } from "baseui/dist/overrides";

const Body: Override<unknown> = {
  style: {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 8px",
    padding: "0",
  },
};

const overrides: Overrides = {
  Body,
};

export const StatefulPopover: React.FC<Partial<PopoverProps>> = ({
  children,
  ...props
}) => (
  <DefaultStatefulPoover
    overrides={overrides}
    animateOutTime={300}
    returnFocus
    autoFocus
    {...props}
  >
    {children}
  </DefaultStatefulPoover>
);
