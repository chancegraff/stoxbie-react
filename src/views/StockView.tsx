import React from "react";
import {
  RouteProps,
} from "react-router-dom";
import {
  Company,
  Logo,
} from "@chancey/iex-cloud";

import {
  useError,
} from "utils/Hooks";

import StockViewLogic from "./StockView/StockViewLogic";

type Props = RouteProps & {
  logo: Logo | undefined;
  company: Company | undefined;
  error?: string;
  handleStart: (date: string) => void;
};

const StockView: React.FC<Props> = (
  {
    logo,
    company,
    error,
    handleStart,
  },
) =>
{
  useError(
    error,
  );

  return (
    <StockViewLogic
      logo={logo}
      company={company}
      handleStart={handleStart}
    />
  );
};

export default StockView;
