import React from "react";
import {
  Company,
} from "iex-cloud";

import {
  StyledLargeSkeleton,
  StyledLargeText,
  StyledSmallSkeleton,
  StyledSmallText,
} from "./StockName.styled";

type Props = {
  company?: Company;
};

const StockName: React.FC<Props> = (
  props,
) =>
{
  return (
    <>
      <StyledLargeSkeleton on={!props.company}>
        <StyledLargeText>
          {props.company?.companyName}
        </StyledLargeText>
      </StyledLargeSkeleton>
      <StyledSmallSkeleton on={!props.company}>
        <StyledSmallText>
          {props.company?.symbol}
        </StyledSmallText>
      </StyledSmallSkeleton>
    </>
  );
};

export default StockName;
