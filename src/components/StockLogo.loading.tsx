import React from "react";
import { Block } from "baseui/dist/block";
import {
  OverridesT,
  Skeleton,
  SkeletonPropsT,
} from "baseui/dist/skeleton";

const overrides: OverridesT = { Root: { style: { borderRadius: "50%" } } };

export const AvatarSkeleton: React.FC<Partial<SkeletonPropsT>> = (props) =>
{
  return (
    <Block height={props.height}>
      <Skeleton
        animation={true}
        overrides={overrides}
        {...props}
      />
    </Block>
  );
};
