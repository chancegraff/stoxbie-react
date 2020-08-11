import React from "react";
import {
  Block,
} from "baseui/dist/block";
import {
  OverridesT,
  Skeleton,
  SkeletonPropsT,
} from "baseui/dist/skeleton";

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
    <Block
      alignItems="flex-end"
      display="flex"
      height={props.height}
      paddingBottom="2px"
    >
      <Skeleton
        animation={true}
        overrides={overrides}
        rows={2}
      />
    </Block>
  );
};
