import React from "react";
import {
  Company,
  Logo,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  useScrollToTop,
} from "utils/Hooks";

import StockViewDisplay from "./StockViewDisplay";

type Props = {
  logo: Logo | undefined;
  company: Company | undefined;
  handleStart: (date: string) => void;
};

const StockViewLogic: React.FC<Props> = (
  {
    logo,
    company,
    handleStart,
  },
) =>
{
  useScrollToTop();

  return (
    <StockViewDisplay
      logo={logo}
      company={company}
      handleStart={handleStart}
    />
  );
};

export default StockViewLogic;
