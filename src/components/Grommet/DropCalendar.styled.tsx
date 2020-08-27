import React, {
  forwardRef,
} from "react";
import {
  Calendar,
  DropButton,
  JSXCalendarProps,
  JSXDropButtonProps,
} from "grommet";

export const StyledCalendar: React.FC<JSXCalendarProps<string>> = (
  props,
) =>
{
  return (
    <Calendar
      margin="small"
      showAdjacentDays={false}
      size="small"
      {...props}
    />
  );
};

export const StyledDropButton: React.FC<JSXDropButtonProps> = forwardRef(
  (
    props,
    ref,
  ) =>
  {
    return (
      <DropButton
        ref={ref}
        {...props}
      />
    );
  },
);
