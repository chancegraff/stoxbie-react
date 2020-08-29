import React, {
  PropsHasChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  JSXDropButtonProps,
} from "grommet";

import {
  StyledCalendar,
  StyledDropButton,
} from "./DropCalendar.styled";

type DropButtonProps = Omit<JSXDropButtonProps, "open" | "dropContent" | "onOpen" | "onClose">;
type Props = PropsHasChildren & DropButtonProps & {
  min?: string;
  max?: string;
  handleSelect: (date: string) => void;
};

export type DropCalendarProps = Props;

const DropCalendar: React.FC<Props> = (
  {
    min,
    max,
    handleSelect,
    ...props
  },
) =>
{
  const [
    dropState,
    setDropState,
  ] = useState<"closed" | "opened">(
    "closed",
  );

  const bounds = useMemo(
    () =>
    {
      if (min &&
          max)
      {
        return [
          min,
          max,
        ];
      }
    },
    [
      min,
      max,
    ],
  );

  const handleClick = useCallback(
    () =>
    {
      if (dropState === "closed")
      {
        setDropState(
          "opened",
        );
      }
      else
      {
        setDropState(
          "closed",
        );
      }
    },
    [
      dropState,
    ],
  );

  const Calendar = useCallback(
    () =>
    {
      return (
        <StyledCalendar
          bounds={bounds}
          onSelect={handleSelect}
        />
      );
    },
    [
      handleSelect,
      bounds,
    ],
  );

  return (
    <StyledDropButton
      {...props}
      open={dropState === "opened"}
      dropContent={<Calendar />}
      onClose={handleClick}
      onOpen={handleClick}
    />
  );
};

export default DropCalendar;
