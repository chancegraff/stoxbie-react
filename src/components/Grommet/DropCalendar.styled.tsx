import React, {
  forwardRef,
} from "react";
import {
  Calendar,
  DropButton,
  JSXCalendarProps,
  JSXDropButtonProps,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

export const StyledCalendar: React.FC<JSXCalendarProps<string>> = (
  props,
) =>
{
  return (
    <Calendar
      css=""
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
        css=""
        {...props}
      />
    );
  },
);
