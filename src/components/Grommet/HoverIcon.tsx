import React from "react";
import {
  JSXIconProps,
} from "grommet-icons";

type Props = {
  hoverState: "idling" | "hovering";
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
  if (hoverState === "idling")
  {
    return <MouseOutIcon />;
  }

  return (
    <MouseOverIcon />
  );
};

export default HoverIcon;
