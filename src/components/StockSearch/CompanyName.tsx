import React, {
  PropsHasClass,
} from "react";
import {
  Company,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetContainer,
  GrommetLargeText,
  GrommetSmallText,
  StoxbieLargeSkeleton,
  StoxbieSmallSkeleton,
} from "./CompanyName.styled";

type Props = PropsHasClass & {
  company: Company | undefined;
};

const StockName: React.FC<Props> = (
  {
    company,
    className,
  },
) =>
{
  if (!company)
  {
    return (
      <GrommetContainer
        className={className}
        css=""
      >
        <StoxbieLargeSkeleton
          css=""
          Container="off"
        />
        <StoxbieSmallSkeleton
          css=""
          Container="off"
        />
      </GrommetContainer>
    );
  }

  return (
    <GrommetContainer
      className={className}
      css=""
    >
      <GrommetLargeText css="">
        {company.companyName}
      </GrommetLargeText>
      <GrommetSmallText css="">
        {company.symbol}
      </GrommetSmallText>
    </GrommetContainer>
  );
};

export default StockName;
