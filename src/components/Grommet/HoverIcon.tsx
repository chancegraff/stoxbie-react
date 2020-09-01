import React, {
  PropsHasClass,
} from "react";
import {
  JSXIconProps,
} from "grommet-icons";

import {
  HoverState,
} from "utils/Hooks";

type Props = PropsHasClass & {
  hoverState: HoverState;
  MouseIdlingIcon: React.FC<JSXIconProps>;
  MouseHoveringIcon: React.FC<JSXIconProps>;
};

const HoverIcon: React.FC<Props> = (
  {
    className,
    hoverState,
    MouseIdlingIcon,
    MouseHoveringIcon,
  },
) =>
{
  if (hoverState === HoverState.Idling)
  {
    return (
      <MouseIdlingIcon
        className={className}
      />
    );
  }

  return (
    <MouseHoveringIcon
      className={className}
    />
  );
};

export default HoverIcon;
