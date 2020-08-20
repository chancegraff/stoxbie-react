import React, {
  forwardRef,
} from "react";
import {
  Text,
} from "grommet";

import {
  SkeletonProps,
  TextProps,
} from "services/Grommet";
import Skeleton from "components/Grommet/Skeleton";

export const StyledLargeSkeleton: React.FC<SkeletonProps> = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <Skeleton
        ref={ref}
        height="34px !important"
        width="220px !important"
        {...props}
      >
        {props.children}
      </Skeleton>
    );
  },
);

export const StyledSmallSkeleton: React.FC<SkeletonProps> = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <Skeleton
        ref={ref}
        height="14px !important"
        width="60px !important"
        margin={
          {
            top: "4px",
          }
        }
        {...props}
      >
        {props.children}
      </Skeleton>
    );
  },
);

export const StyledLargeText: React.FC<TextProps> = forwardRef<HTMLSpanElement, TextProps>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <Text
        ref={ref}
        size="xlarge"
        weight="bold"
        {...props}
      >
        {props.children}
      </Text>
    );
  },
);

export const StyledSmallText: React.FC<TextProps> = forwardRef<HTMLSpanElement, TextProps>(
  (
    props,
    ref,
  ) =>
  {
    return (
      <Text
        ref={ref}
        size="xsmall"
        color="text-xweak"
        {...props}
      >
        {props.children}
      </Text>
    );
  },
);
