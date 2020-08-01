import { StatefulMenu as DefaultStatefulMenu, StatefulMenuProps } from "baseui/dist/menu";
import { Override } from "baseui/dist/overrides";
import React from "react";

const List: Override<unknown> = {
  style: {
    paddingBottom: "0",
    paddingTop: "0",
  },
};

const overrides = {
  List,
};

export const StatefulMenu: React.FC<StatefulMenuProps> = ({ children, ...props }) => (
  <DefaultStatefulMenu overrides={overrides} {...props}>
    {children}
  </DefaultStatefulMenu>
);
