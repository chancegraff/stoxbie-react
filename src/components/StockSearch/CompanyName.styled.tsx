import React from "react";
import {
  Box,
  JSXBoxProps,
  JSXTextProps,
  Text,
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
      {...props}
    />
  );
};

export const StoxbieLargeSkeleton: React.FC<JSXSkeletonProps> = (
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

export const StoxbieSmallSkeleton: React.FC<JSXSkeletonProps> = (
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

export const GrommetLargeText: React.FC<JSXTextProps> = (
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

export const GrommetSmallText: React.FC<JSXTextProps> = (
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
