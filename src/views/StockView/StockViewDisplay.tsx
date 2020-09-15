import React from "react";
import {
  RouteProps,
} from "react-router-dom";
import {
  Company,
  Logo,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import PageContent from "components/PageTemplates/PageContent";
import CompanyLogo from "components/StockSearch/CompanyLogo";
import CompanyName from "components/StockSearch/CompanyName";
import ChooseDate from "components/TimeControls/ChooseDate";

import {
  GrommetContainer,
} from "./StockViewStyles";

type Props = RouteProps & {
  logo: Logo | undefined;
  company: Company | undefined;
  handleStart: (date: string) => void;
};

const StockViewDisplay: React.FC<Props> = (
  {
    logo,
    company,
    handleStart,
  },
) =>
{
  return (
    <PageContent css="">
      <GrommetContainer css="">
        <CompanyLogo
          css=""
          logo={logo}
        />
        <CompanyName
          css=""
          company={company}
        />
        <ChooseDate
          css=""
          handleStart={handleStart}
        />
      </GrommetContainer>
    </PageContent>
  );
};

export default StockViewDisplay;
