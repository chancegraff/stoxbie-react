import React, {
  PropsHasChildren,
  useCallback,
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
  handleSelect: (date: string) => void;
};

export type DropCalendarProps = Props;

const DropCalendar: React.FC<Props> = (
  {
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
          onSelect={handleSelect}
        />
      );
    },
    [
      handleSelect,
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
