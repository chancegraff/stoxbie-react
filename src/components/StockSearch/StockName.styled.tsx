import React from "react";
import {
  Text,
  TextProps,
} from "grommet";

import Skeleton, {
  SkeletonProps,
} from "components/Grommet/Skeleton";

export const StyledLargeSkeleton: React.FC<SkeletonProps> = (
  props,
) =>
{
  return (
    <Skeleton
      height="34px !important"
      width="220px !important"
      {...props}
    />
  );
};

export const StyledSmallSkeleton: React.FC<SkeletonProps> = (
  props,
) =>
{
  return (
    <Skeleton
      height="14px !important"
      width="60px !important"
      margin={
        {
          top: "4px",
        }
      }
      {...props}
    />
  );
};

export const StyledLargeText: React.FC<TextProps> = (
  props,
) =>
{
  return (
    <Text
      size="xlarge"
      weight="bold"
      {...props}
    />
  );
};

export const StyledSmallText: React.FC<TextProps> = (
  props,
) =>
{
  return (
    <Text
      size="xsmall"
      color="text-xweak"
      {...props}
    />
  );
};
