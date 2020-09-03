import React from "react";
import {
  Logo,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetAvatar,
  GrommetContainer,
  StoxbieSkeleton,
} from "./CompanyLogo.styled";

type Props = {
  logo: Logo | undefined;
};

const StockLogo: React.FC<Props> = (
  {
    logo,
  },
) =>
{
  if (!logo)
  {
    return (
      <GrommetContainer css="">
        <StoxbieSkeleton Container={GrommetContainer} />
      </GrommetContainer>
    );
  }

  return (
    <GrommetContainer css="">
      <GrommetAvatar
        css=""
        src={logo.url}
      />
    </GrommetContainer>
  );
};

export default StockLogo;
