import React from "react";
import {
  Avatar,
  AvatarProps,
  Box,
  BoxProps,
} from "grommet";

import Skeleton, {
  JSXSkeletonProps,
} from "components/Grommet/Skeleton";

export const GrommetContainer: React.FC<BoxProps> = (
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

export const StoxbieSkeleton: React.FC<JSXSkeletonProps> = (
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

export const GrommetAvatar: React.FC<AvatarProps> = (
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
