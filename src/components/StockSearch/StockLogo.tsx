import React from "react";
import {
  Logo,
} from "iex-cloud";

import {
  StyledAvatar,
  StyledContainer,
  StyledSkeleton,
} from "./StockLogo.styled";

type Props = {
  logo?: Logo;
};

const StockLogo: React.FC<Props> = (
  props,
) =>
{
  if (!props.logo)
  {
    return <StyledSkeleton Container={StyledContainer} />;
  }

  return (
    <StyledContainer>
      <StyledAvatar src={props?.logo?.url} />
    </StyledContainer>
  );
};

export default StockLogo;
