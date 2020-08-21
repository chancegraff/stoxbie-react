import React from "react";
import {
  Avatar,
  Box,
} from "grommet";

import Skeleton, {
  SkeletonProps,
} from "components/Grommet/Skeleton";

export const StyledContainer: React.FC<BoxProps> = (
  props,
) =>
{
  return (
    <Box
      height="96px"
      width="96px"
      {...props}
    />
  );
};

export const StyledSkeleton: React.FC<SkeletonProps> = (
  props,
) =>
{
  return (
    <Skeleton
      round="100%"
      {...props}
    />
  );
};

export const StyledAvatar: React.FC<AvatarProps> = (
  props,
) =>
{
  return (
    <Avatar
      size="96px"
      {...props}
    />
  );
};
