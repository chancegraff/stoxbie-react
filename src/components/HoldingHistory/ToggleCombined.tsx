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
} from "utils/hooks/useHover";
import HoverIcon from "components/Grommet/HoverIcon";

import {
  GrommetContainer,
  GrommetDrop,
  GrommetExtendingIcon,
  GrommetRetractingIcon,
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
        return GrommetExtendingIcon;
      }

      return GrommetRetractingIcon;
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
        return GrommetRetractingIcon;
      }

      return GrommetExtendingIcon;
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

  if (
    (
      !rowToTarget ||
      rowHoverState === HoverState.Idling
    )
  )
  {
    return null;
  }

  return (
    <GrommetDrop
      css=""
      target={rowToTarget}
    >
      <GrommetContainer
        css=""
        onClick={handleClick}
        onMouseEnter={handleMouseEnterButton}
        onMouseLeave={handleMouseLeaveButton}
      >
        <HoverIcon
          css=""
          hoverState={buttonHoverState}
          MouseIdlingIcon={IdlingIcon}
          MouseHoveringIcon={HoveringIcon}
        />
      </GrommetContainer>
    </GrommetDrop>
  );
};

export default ToggleCombined;
