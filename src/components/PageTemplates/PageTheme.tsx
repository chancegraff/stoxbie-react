import React from "react";
// import {
//   Moon,
//   Sun,
// } from "grommet-icons";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetContainer,
} from "./PageContent.styled";

type Props = unknown;

const PageTheme: React.FC<Props> = (
  props,
) =>
{
  return (
    <GrommetContainer css="">
      Theme switch
    </GrommetContainer>
  );
};

export default PageTheme;
