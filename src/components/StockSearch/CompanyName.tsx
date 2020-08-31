import React from "react";
import {
  Company,
} from "@chancey/iex-cloud";

import {
  StyledContainer,
  StyledLargeSkeleton,
  StyledLargeText,
  StyledSmallSkeleton,
  StyledSmallText,
} from "./CompanyName.styled";

type Props = {
  company: Company | undefined;
};

const StockName: React.FC<Props> = (
  props,
) =>
{
  if (!props.company)
  {
    return (
      <StyledContainer>
        <StyledLargeSkeleton Container="off" />
        <StyledSmallSkeleton Container="off" />
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledLargeText>
        {props.company?.companyName}
      </StyledLargeText>
      <StyledSmallText>
        {props.company?.symbol}
      </StyledSmallText>
    </StyledContainer>
  );
};

export default StockName;
