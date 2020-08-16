import React from "react";
import {
  OverridesT,
  Skeleton,
  SkeletonPropsT,
} from "baseui/dist/skeleton";
import {
  Box,
} from "grommet";

const overrides: OverridesT = {
  Root: {
    style: {
      borderRadius: "50%",
    },
  },
};

export const AvatarSkeleton: React.FC<Partial<SkeletonPropsT>> = (
  props,
) =>
{
  return (
    <Box height={props.height}>
      <Skeleton
        animation={true}
        overrides={overrides}
        {...props}
      />
    </Box>
  );
};
