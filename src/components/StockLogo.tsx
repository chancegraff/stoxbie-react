import React from "react";
import {
  useStyletron,
} from "baseui/dist";
import {
  Avatar,
} from "baseui/dist/avatar";
import {
  Block,
} from "baseui/dist/block";
import {
  Logo,
} from "iex-cloud";

import {
  AvatarSkeleton,
} from "./StockLogo.loading";

type Props = {
  logo?: Logo;
};

const StockLogo: React.FC<Props> = (
  props,
) =>
{
  const [
    ,
    theme,
  ] = useStyletron();

  if (!props.logo)
  {
    return (
      <AvatarSkeleton
        height={theme.sizing.scale2400}
        width={theme.sizing.scale2400}
      />
    );
  }

  return (
    <Block
      height={theme.sizing.scale2400}
      width={theme.sizing.scale2400}
    >
      <Avatar
        name="Company logo"
        size={theme.sizing.scale2400}
        src={props.logo.url}
      />
    </Block>
  );
};

export default StockLogo;
