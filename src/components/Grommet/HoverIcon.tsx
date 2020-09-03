import React from "react";
import {
  JSXIconProps,
} from "grommet-icons";

import {
  HoverState,
} from "utils/dicks/useHover";

type Props = {
  disabled?: boolean;
  hoverState: HoverState;
  MouseIdlingIcon: React.FC<JSXIconProps>;
  MouseHoveringIcon: React.FC<JSXIconProps>;
};

// TODO Don't pass components
const HoverIcon: React.FC<Props> = (
  {
    disabled,
    hoverState,
    MouseIdlingIcon,
    MouseHoveringIcon,
  },
) =>
{
  if (
    (
      disabled ||
      hoverState === HoverState.Idling
    )
  )
  {
    return (
      <MouseIdlingIcon />
    );
  }

  return (
    <MouseHoveringIcon />
  );
};

export default HoverIcon;
