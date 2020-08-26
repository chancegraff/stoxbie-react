import React, {
  forwardRef,
} from "react";
import {
  subYears,
} from "date-fns";
import {
  Box,
  Button,
  JSXBoxProps,
  JSXButtonProps,
  JSXTextProps,
  Text,
} from "grommet";
import styled from "styled-components";

import DropCalendar, {
  DropCalendarProps,
} from "components/Grommet/DropCalendar";

const today = new Date();
const tenYearsAgo = subYears(
  today,
  10,
);

const GroupedContainer: React.FC<JSXBoxProps> = styled(
  Box,
)`
& button:first-child div {
  border-radius: 25px 0px 0px 25px;
  padding-left: 12px;
}

& button:last-child div {
  border-radius: 0px 25px 25px 0px;
  padding-right: 12px;
}
`;

export const StyledContainer: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <GroupedContainer
      width={
        {
          min: "100px",
        }
      }
      direction="row"
      {...props}
    />
  );
};

export const StyledButton: React.FC<JSXButtonProps> = forwardRef(
  (
    props,
    ref,
  ) =>
  {
    return (
      <Button
        plain={true}
        fill="horizontal"
        {...props}
        ref={ref}
      />
    );
  },
);

export const StyledDropCalendar: React.FC<DropCalendarProps> = (
  props,
) =>
{
  return (
    <DropCalendar
      min={tenYearsAgo.toISOString()}
      max={today.toISOString()}
      plain={true}
      fill="horizontal"
      dropProps={
        {
          align: {
            top: "bottom",
            left: "right",
          },
        }
      }
      {...props}
    />
  );
};

export const ButtonChildHover: React.FC<JSXBoxProps> = styled(
  Box,
)`
&:hover {
  span {
    font-weight: bold;
  }

  path {
    stroke-width: 3px;
  }
}
`;

export const StyledButtonChild: React.FC<JSXBoxProps> = (
  props,
) =>
{
  return (
    <ButtonChildHover
      fill={true}
      flex="grow"
      align="center"
      justify="center"
      background="brand"
      pad="4px 8px"
      round="0"
      {...props}
    />
  );
};

export const StyledButtonText: React.FC<JSXTextProps> = (
  props,
) =>
{
  return (
    <Text
      size="xsmall"
      {...props}
    />
  );
};
