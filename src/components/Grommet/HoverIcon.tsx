import React from "react";
import {
  JSXIconProps,
} from "grommet-icons";

import {
  HoverState,
} from "utils/Hooks";

type Props = {
  hoverState: HoverState;
  MouseOutIcon: React.FC<JSXIconProps>;
  MouseOverIcon: React.FC<JSXIconProps>;
};

const HoverIcon: React.FC<Props> = (
  {
    hoverState,
    MouseOutIcon,
    MouseOverIcon,
  },
) =>
{
  if (hoverState === HoverState.Idling)
  {
    return <MouseOutIcon />;
  }

  return (
    <MouseOverIcon />
  );
};

export default HoverIcon;
