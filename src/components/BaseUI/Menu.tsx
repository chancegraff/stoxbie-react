import React from "react";
import {
  StatefulMenu as DefaultStatefulMenu,
  StatefulMenuProps,
} from "baseui/dist/menu";
import { Override } from "baseui/dist/overrides";

const List: Override<unknown> = {
  style: {
    paddingTop:
      "0",
    paddingBottom:
      "0",
  },
};

const overrides = {
  List,
};

export const StatefulMenu: React.FC<StatefulMenuProps> = ({
  children,
  ...props
}) => (
  <DefaultStatefulMenu
    overrides={
      overrides
    }
    {...props}
  >
    {
      children
    }
  </DefaultStatefulMenu>
);
