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
  Row: {
    style: {
      ":first-of-type": {
        height: "33px",
        marginBottom: "12px",
        width: "320px",
      },
      ":last-of-type": {
        height: "10px",
        width: "30px",
      },
    },
  },
};

export const DetailsSkeleton: React.FC<Partial<SkeletonPropsT>> = (
  props,
) =>
{
  return (
    <Box
      alignContent="end"
      height={props.height}
      pad="xxsmall"
    >
      <Skeleton
        animation={true}
        overrides={overrides}
        rows={2}
      />
    </Box>
  );
};
