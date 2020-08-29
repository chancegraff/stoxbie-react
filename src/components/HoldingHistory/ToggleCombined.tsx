import React, {
  useMemo,
} from "react";

import {
  CombinedBodyState,
} from "utils/Constants";
import {
  HoverState,
  useHover,
} from "utils/Hooks";
import HoverIcon from "components/Grommet/HoverIcon";

import {
  StyledContainer,
  StyledDrop,
  StyledStopIcon,
  StyledSubtractIcon,
} from "./ToggleCombined.styled";

type Props = {
  rowToTarget: HTMLTableRowElement | undefined;
  rowHoverState: HoverState;
  handleToggleCombined: () => void;
  combinedBodyState: CombinedBodyState;
};

const ToggleCombined: React.FC<Props> = (
  {
    rowToTarget,
    rowHoverState,
    handleToggleCombined,
    combinedBodyState,
  },
) =>
{
  const [
    buttonHoverState,
    handleMouseEnterButton,
    handleMouseLeaveButton,
  ] = useHover();

  const IdlingIcon = useMemo(
    () =>
    {
      if (
        combinedBodyState === CombinedBodyState.Extending &&
        buttonHoverState === HoverState.Idling
      )
      {
        return StyledStopIcon;
      }

      return StyledSubtractIcon;
    },
    [
      combinedBodyState,
      buttonHoverState,
    ],
  );
  const HoveringIcon = useMemo(
    () =>
    {
      switch (true)
      {
        case (
          combinedBodyState === CombinedBodyState.Retracting &&
          buttonHoverState === HoverState.Hovering
        ):
        {
          return StyledSubtractIcon;
        }
        default:
        {
          return StyledStopIcon;
        }
      }
    },
    [
      combinedBodyState,
      buttonHoverState,
    ],
  );

  if (!rowToTarget ||
 rowHoverState === HoverState.Idling)
  {
    return null;
  }

  return (
    <StyledDrop target={rowToTarget}>
      <StyledContainer
        onClick={handleToggleCombined}
        onMouseEnter={handleMouseEnterButton}
        onMouseLeave={handleMouseLeaveButton}
      >
        <HoverIcon
          hoverState={buttonHoverState}
          MouseIdlingIcon={IdlingIcon}
          MouseHoveringIcon={HoveringIcon}
        />
      </StyledContainer>
    </StyledDrop>
  );
};

export default ToggleCombined;
