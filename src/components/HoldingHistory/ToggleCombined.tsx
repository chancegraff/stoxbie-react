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
  rowToTarget: HTMLTableRowElement | undefined;
  rowHoverState: HoverState;
};

const ToggleCombined: React.FC<Props> = (
  {
    rowToTarget,
    rowHoverState,
  },
) =>
{
  const [
    buttonHoverState,
    handleMouseEnterButton,
    handleMouseLeaveButton,
  ] = useHover();

  if (!rowToTarget || rowHoverState === HoverState.Idling)
  {
    return null;
  }

  return (
    <StyledDrop target={rowToTarget}>
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
