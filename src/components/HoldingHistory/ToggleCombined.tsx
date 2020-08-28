import React from "react";

import {
  HoverState,
} from "utils/Hooks";

import {
  StyledClosedIcon,
  StyledContainer,
  StyledDrop,
  StyledOpenedIcon,
} from "./ToggleCombined.styled";

type Props = {
  hoverState: HoverState;
  presentRow: HTMLTableRowElement | undefined;
};

const ToggleCombined: React.FC<Props> = (
  {
    hoverState,
    presentRow,
  },
) =>
{
  if (!presentRow || hoverState === HoverState.Idling)
  {
    return null;
  }

  return (
    <StyledDrop target={presentRow}>
      <StyledContainer>
        <StyledClosedIcon />
      </StyledContainer>
    </StyledDrop>
  );
};

export default ToggleCombined;
