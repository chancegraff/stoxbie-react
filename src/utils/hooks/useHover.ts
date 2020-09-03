import {
  useCallback,
  useState,
} from "react";

export enum HoverState {
  Idling,
  Hovering,
}

export type HandleMouseEnter = () => void;

export type HandleMouseLeave = () => void;

export const useHover = (): [
  HoverState,
  HandleMouseEnter,
  HandleMouseLeave,
] =>
{
  const [
    hoverState,
    setHoverState,
  ] = useState<HoverState>(
    HoverState.Idling,
  );

  const handleMouseLeave = useCallback(
    () =>
    {
      setHoverState(
        HoverState.Idling,
      );
    },
    [],
  );
  const handleMouseEnter = useCallback(
    () =>
    {
      setHoverState(
        HoverState.Hovering,
      );
    },
    [],
  );

  return [
    hoverState,
    handleMouseEnter,
    handleMouseLeave,
  ];
};
