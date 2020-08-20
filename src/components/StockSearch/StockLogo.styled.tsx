import React, {
  forwardRef,
} from "react";
import {
  Avatar,
  Box,
} from "grommet";

import {
  AvatarProps,
  BoxProps,
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
        height="96px"
        width="96px"
      >
        {props.children}
      </Box>
    );
  },
);

export const StyledAvatar: React.FC<AvatarProps> = forwardRef<HTMLDivElement>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <Avatar
        ref={ref}
        size="96px"
        {...props}
      />
    );
  },
);
