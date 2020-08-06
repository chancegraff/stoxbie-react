import React from "react";
import {
  StatefulMenu as DefaultStatefulMenu,
  StatefulMenuProps,
} from "baseui/dist/menu";
import { Override } from "baseui/dist/overrides";

const List: Override<unknown> = { style: {
  paddingBottom: "0",
  paddingTop: "0",
} };

const overrides = { List };

export const StatefulMenu: React.FC<StatefulMenuProps> = ({
  children,
  ...props
}) =>
{
  return (
    <DefaultStatefulMenu
      overrides={overrides}
      {...props}
    >
      {children}
    </DefaultStatefulMenu>
  );
};
