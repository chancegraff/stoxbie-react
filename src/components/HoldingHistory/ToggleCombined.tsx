import React from "react";

import {
  HoverState,
  useHover,
} from "utils/Hooks";
import HoverIcon from "components/Grommet/HoverIcon";

import {
  StyledClosedIcon,
  StyledContainer,
  StyledDrop,
  StyledOpenedIcon,
} from "./ToggleCombined.styled";

type Props = {
  presentRow: HTMLTableRowElement | undefined;
  rowHoverState: HoverState;
};

const ToggleCombined: React.FC<Props> = (
  {
    presentRow,
    rowHoverState,
  },
) =>
{
  const [
    buttonHoverState,
    handleMouseEnterButton,
    handleMouseLeaveButton,
  ] = useHover();

  if (!presentRow || rowHoverState === HoverState.Idling)
  {
    return null;
  }

  return (
    <StyledDrop target={presentRow}>
      <StyledContainer
        onMouseEnter={handleMouseEnterButton}
        onMouseLeave={handleMouseLeaveButton}
      >
        <HoverIcon
          hoverState={buttonHoverState}
          MouseIdlingIcon={StyledClosedIcon}
          MouseHoveringIcon={StyledOpenedIcon}
        />
      </StyledContainer>
    </StyledDrop>
  );
};

export default ToggleCombined;
