import React from "react";
import {
  Avatar,
  Box,
  JSXAvatarProps,
  JSXBoxProps,
} from "grommet";

import Skeleton, {
  JSXSkeletonProps,
} from "components/Grommet/Skeleton";

export const GrommetContainer: React.FC<JSXBoxProps> = (
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

export const GrommetAvatar: React.FC<JSXAvatarProps> = (
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
