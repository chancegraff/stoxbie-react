import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  RouteProps,
  useHistory,
  useParams,
} from "react-router-dom";
import {
  Company,
  company as getCompany,
  Logo,
  logo as getLogo,
} from "@chancey/iex-cloud";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  ROUTE_ORDER,
  TICKER_ERROR_MESSAGE,
} from "utils/Constants";
import {
  useError,
} from "utils/Hooks";
import {
  createLogger,
} from "utils/Logger";
import {
  handleUnloadCreator,
} from "utils/Utilities";

import StockViewLogic from "./StockView/StockViewLogic";

const ERROR_MESSAGE =
  "There was a problem attempting to load company information about the stock you requested.";

type Props = RouteProps & {
};

const logger = createLogger(
  "StockView",
);

const StockView: React.FC<Props> = () =>
{
  const history = useHistory();

  const {
    ticker = "",
  } = useParams<{
    ticker: string | undefined;
  }>();

  const [
    logo,
    setLogo,
  ] = useState<Logo>();
  const [
    company,
    setCompany,
  ] = useState<Company>();
  const [
    error,
    setError,
  ] = useState<string>();

  const safeTicker = useMemo(
    () =>
    {
      if (ticker)
      {
        return ticker;
      }
      setError(
        TICKER_ERROR_MESSAGE,
      );
    },
    [
      ticker,
    ],
  );

  const handleStart = useCallback(
    (
      date: string,
    ) =>
    {
      if (company)
      {
        history.push(
          `${ROUTE_ORDER}/${company.symbol}/${date}`,
        );
      }
    },
    [
      history,
      company,
    ],
  );

  const handleLoad = useCallback(
    async (
      nextTicker: string | undefined,
    ) =>
    {
      if (!nextTicker)
      {
        return;
      }

      const nextCompany = await getCompany(
        nextTicker,
      );
      const nextLogo = await getLogo(
        nextTicker,
      ).catch();

      if (!nextCompany ||
          !nextLogo)
      {
        setError(
          ERROR_MESSAGE,
        );
      }
      else
      {
        setLogo(
          nextLogo,
        );
        setCompany(
          nextCompany,
        );
      }
    },
    [],
  );

  useEffect(
    () =>
    {
      handleLoad(
        safeTicker,
      );
    },
    [
      handleLoad,
      safeTicker,
    ],
  );

  useEffect(
    () =>
    {
      return handleUnloadCreator(
        [
          setLogo,
          setCompany,
          setError,
        ],
      );
    },
    [],
  );

  useError(
    error,
  );

  logger.debug(
    "Rendering logic and display",
  );

  return (
    <StockViewLogic
      css=""
      company={company}
      logo={logo}
      handleStart={handleStart}
    />
  );
};

export default StockView;
