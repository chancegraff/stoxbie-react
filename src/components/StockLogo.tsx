import { useStyletron } from "baseui/dist";
import { Avatar } from "baseui/dist/avatar";
import { Block } from "baseui/dist/block";
import { OverridesT, Skeleton, SkeletonPropsT } from "baseui/dist/skeleton";
import { Logo } from "iex-cloud";
import React from "react";

type Props = {
  logo?: Logo;
};

const overrides: OverridesT = {
  Root: {
    style: {
      borderRadius: "50%",
    },
  },
};

const AvatarSkeleton: React.FC<Partial<SkeletonPropsT>> = (props) => (
  <Block height={props.height}>
    <Skeleton animation={true} overrides={overrides} {...props} />
  </Block>
);

const StockLogo: React.FC<Props> = (props) => {
  const [, theme] = useStyletron();

  if (!props.logo) {
    return <AvatarSkeleton width={theme.sizing.scale2400} height={theme.sizing.scale2400} />;
  }

  return (
    <Block height={theme.sizing.scale2400} width={theme.sizing.scale2400}>
      <Avatar name="Company logo" src={props.logo.url} size={theme.sizing.scale2400} />
    </Block>
  );
};

export default StockLogo;
