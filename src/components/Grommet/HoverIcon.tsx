import React, {
  PropsHasClass,
} from "react";
import {
  JSXIconProps,
} from "grommet-icons";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

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
        css=""
        className={className}
      />
    );
  }

  return (
    <MouseHoveringIcon
      css=""
      className={className}
    />
  );
};

export default HoverIcon;
