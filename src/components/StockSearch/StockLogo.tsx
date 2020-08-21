import React from "react";
import {
  Logo,
} from "iex-cloud";

import Skeleton from "components/Grommet/Skeleton";

import {
  StyledAvatar,
  StyledContainer,
} from "./StockLogo.styled";

type Props = {
  logo?: Logo;
};

const StockLogo: React.FC<Props> = (
  props,
) =>
{
  return (
    <StyledContainer>
      <Skeleton
        on={!props.logo}
        round="100%"
      >
        <StyledAvatar src={props?.logo?.url} />
      </Skeleton>
    </StyledContainer>
  );
};

export default StockLogo;
