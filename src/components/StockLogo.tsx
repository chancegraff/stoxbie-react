import React from "react";
import {
  Avatar,
  Box,
} from "grommet";
import {
  Logo,
} from "iex-cloud";

import Skeleton from "components/Grommet/Skeleton";

type Props = {
  logo?: Logo;
};

const StockLogo: React.FC<Props> = (
  props,
) =>
{
  return (
    <Box
      height="96px"
      width="96px"
    >
      <Skeleton
        on={!props.logo}
        round="100%"
      >
        <Avatar
          size="96px"
          src={props?.logo?.url}
        />
      </Skeleton>
    </Box>
  );
};

export default StockLogo;
