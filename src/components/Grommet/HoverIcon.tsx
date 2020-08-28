import React from "react";
import {
  JSXIconProps,
} from "grommet-icons";

import {
  HoverState,
} from "utils/Hooks";

type Props = {
  hoverState: HoverState;
  MouseIdlingIcon: React.FC<JSXIconProps>;
  MouseHoveringIcon: React.FC<JSXIconProps>;
};

const HoverIcon: React.FC<Props> = (
  {
    hoverState,
    MouseIdlingIcon,
    MouseHoveringIcon,
  },
) =>
{
  if (hoverState === HoverState.Idling)
  {
    return <MouseIdlingIcon />;
  }

  return (
    <MouseHoveringIcon />
  );
};

export default HoverIcon;
