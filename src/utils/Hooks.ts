import {
  useCallback,
  useState,
} from "react";

export enum HoverState {
  Idling,
  Hovering,
}

export type HandleMouseOver = () => void;

export type HandleMouseOut = () => void;

export const useHover = (): {
  hoverState: HoverState;
  handleMouseOver: HandleMouseOver;
  handleMouseOut: HandleMouseOut;
} =>
{
  const [
    hoverState,
    setHoverState,
  ] = useState<HoverState>(
    HoverState.Idling,
  );

  const handleMouseOver = useCallback(
    () =>
    {
      setHoverState(
        HoverState.Hovering,
      );
    },
    [],
  );
  const handleMouseOut = useCallback(
    () =>
    {
      setHoverState(
        HoverState.Idling,
      );
    },
    [],
  );

  return {
    hoverState,
    handleMouseOver,
    handleMouseOut,
  };
};
