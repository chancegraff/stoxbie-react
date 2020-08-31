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
  props,
) =>
{
  if (!props.logo)
  {
    return (
      <StoxbieSkeleton
        css=""
        Container={GrommetContainer}
      />
    );
  }

  return (
    <GrommetContainer css="">
      <GrommetAvatar
        css=""
        src={props?.logo?.url}
      />
    </GrommetContainer>
  );
};

export default StockLogo;
