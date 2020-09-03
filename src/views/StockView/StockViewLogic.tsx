import React from "react";
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
import PageError from "components/PageTemplates/PageError";

import StockViewDisplay from "./StockViewDisplay";

type Props = RouteProps & {
  logo: Logo | undefined;
  company: Company | undefined;
  error?: string;
  handleStart: (date: string) => void;
};

const StockViewLogic: React.FC<Props> = (
  {
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
      <PageError css="">
        {error}
      </PageError>
    );
  }

  return (
    <StockViewDisplay
      logo={logo}
      company={company}
      handleStart={handleStart}
    />
  );
};

export default StockViewLogic;
