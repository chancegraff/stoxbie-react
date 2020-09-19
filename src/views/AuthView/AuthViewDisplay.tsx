import React from "react";
import {
  RouteProps,
} from "react-router-dom";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import PageContent from "components/PageTemplates/PageContent";

import {
  GrommetCard,
  GrommetFormContainer,
  GrommetGrid,
  GrommetHeading,
  GrommetIllustrationContainer,
} from "./AuthViewStyles";

type Props = RouteProps;

const AuthViewDisplay: React.FC<Props> = () =>
{
  return (
    <PageContent
      pad="none"
      css=""
    >
      <GrommetGrid>
        <GrommetFormContainer>
          <GrommetCard>
            <GrommetHeading css="">
              Start Playing
            </GrommetHeading>
          </GrommetCard>
        </GrommetFormContainer>
        <GrommetIllustrationContainer>
          Illustration
        </GrommetIllustrationContainer>
      </GrommetGrid>
    </PageContent>
  );
};

export default AuthViewDisplay;
