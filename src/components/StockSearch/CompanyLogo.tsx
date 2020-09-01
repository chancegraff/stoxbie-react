import React, {
  PropsHasClass,
} from "react";
import {
  Logo,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetAvatar,
  GrommetContainer,
  StoxbieSkeleton,
} from "./CompanyLogo.styled";

type Props = PropsHasClass & {
  logo: Logo | undefined;
};

const StockLogo: React.FC<Props> = (
  {
    logo,
    className,
  },
) =>
{
  if (!logo)
  {
    return (
      <GrommetContainer
        className={className}
        css=""
      >
        <StoxbieSkeleton Container={GrommetContainer} />
      </GrommetContainer>
    );
  }

  return (
    <GrommetContainer
      className={className}
      css=""
    >
      <GrommetAvatar
        css=""
        src={logo.url}
      />
    </GrommetContainer>
  );
};

export default StockLogo;
