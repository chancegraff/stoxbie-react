import { Override } from "baseui/dist/overrides";
import {
  Overrides,
  PopoverProps,
  StatefulPopover as DefaultStatefulPoover,
} from "baseui/dist/popover";
import React from "react";

const Body: Override<unknown> = {
  style: {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 2px 8px",
    padding: "0",
  },
};

const overrides: Overrides = {
  Body,
};

export const StatefulPopover: React.FC<Partial<PopoverProps>> = (
  {
    children,
    ...props
  },
) => {
  return (
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
};
