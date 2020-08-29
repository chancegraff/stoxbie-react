import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
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
  StyledExtendingIcon,
  StyledRetractingIcon,
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
  const [
    hasClicked,
    setHasClicked,
  ] = useState(
    false,
  );

  const IdlingIcon = useMemo(
    () =>
    {
      if (combinedBodyState === CombinedBodyState.Extending)
      {
        return StyledExtendingIcon;
      }

      return StyledRetractingIcon;
    },
    [
      combinedBodyState,
    ],
  );
  const HoveringIcon = useMemo(
    () =>
    {
      const extendedWithoutClick = !hasClicked &&
      (
        combinedBodyState === CombinedBodyState.Extending
      );
      const retractedWithClick = hasClicked &&
      (
        combinedBodyState === CombinedBodyState.Retracting
      );

      if (buttonHoverState === HoverState.Hovering &&
        (
          extendedWithoutClick ||
          retractedWithClick
        )
      )
      {
        return StyledRetractingIcon;
      }

      return StyledExtendingIcon;
    },
    [
      combinedBodyState,
      buttonHoverState,
      hasClicked,
    ],
  );

  const handleClick = useCallback(
    () =>
    {
      setHasClicked(
        true,
      );
      handleToggleCombined();
    },
    [
      handleToggleCombined,
    ],
  );

  useEffect(
    () =>
    {
      setHasClicked(
        false,
      );
    },
    [
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
        onClick={handleClick}
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
