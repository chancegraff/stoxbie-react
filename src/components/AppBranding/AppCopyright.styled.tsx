import React, {
  forwardRef,
} from "react";
import {
  Box, Text,
} from "grommet";

import {
  BoxProps, TextProps,
} from "services/Grommet";

export const StyledContainer: React.FC<BoxProps> = forwardRef<HTMLDivElement>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <Box
        ref={ref}
        pad={
          {
            vertical: "medium",
          }
        }
        {...props}
      >
        {props.children}
      </Box>
    );
  },
);

export const StyledText: React.FC<TextProps> = forwardRef<HTMLSpanElement>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <Text
        ref={ref}
        size="xsmall"
      >
        {props.children}
      </Text>
    );
  },
);
