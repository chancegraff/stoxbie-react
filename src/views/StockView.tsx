import React, {
  PropsHasClass,
} from "react";
import {
  RouteProps,
} from "react-router-dom";
import {
  Company,
  Logo,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  useScrollToTop,
} from "utils/Hooks";
import PageContent from "components/PageTemplates/PageContent";
import PageError from "components/PageTemplates/PageError";
import CompanyLogo from "components/StockSearch/CompanyLogo";
import CompanyName from "components/StockSearch/CompanyName";
import ChooseDate from "components/TimeControls/ChooseDate";

import {
  GrommetContainer,
} from "./StockView.styled";

type Props = RouteProps & PropsHasClass & {
  logo: Logo | undefined;
  company: Company | undefined;
  error?: string;
  handleStart: (date: string) => void;
};

const StockView: React.FC<Props> = (
  {
    className,
    logo,
    company,
    error,
    handleStart,
  },
) =>
{
  useScrollToTop();

  if (error)
  {
    return (
      <PageError
        className={className}
        css=""
      >
        {error}
      </PageError>
    );
  }

  return (
    <PageContent
      className={className}
      css=""
    >
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

export default StockView;
