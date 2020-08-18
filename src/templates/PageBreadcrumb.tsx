import React, {
  useMemo,
} from "react";
import {
  useParams,
  useRouteMatch,
} from "react-router-dom";
import {
  Breadcrumbs,
} from "baseui/dist/breadcrumbs";
import {
  Box,
} from "grommet";

import {
  DateFormats,
  formatParsedDate,
} from "utils/Utilities";
import Anchor from "components/Grommet/Anchor";

type Props = unknown;

const StockBreadcrumb: React.FC = () =>
{
  const {
    ticker,
  } = useParams();

  return (
    <Breadcrumbs>
      <Anchor to="/">
        Ticker Search
      </Anchor>
      <span>
        {ticker}
      </span>
    </Breadcrumbs>
  );
};

const TradeBreadcrumb: React.FC = () =>
{
  const {
    ticker,
    date,
  }: {
    ticker: string;
    date: string;
  } = useParams();
  const safeDate = useMemo(
    () =>
    {
      return formatParsedDate(
        date,
        DateFormats.URL,
        DateFormats.Full,
      );
    },
    [
      date,
    ],
  );

  return (
    <Breadcrumbs>
      <Anchor to="/">
        Ticker Search
      </Anchor>
      <Anchor to={`/stock/${ticker}`}>
        {ticker}
      </Anchor>
      <span>
        {`Trading from ${safeDate}`}
      </span>
    </Breadcrumbs>
  );
};

const BreadcrumbContainer: React.FC<Props> = () =>
{
  const tradeView = useRouteMatch(
    "/trade/:ticker/:date",
  );
  const stockView = useRouteMatch(
    "/stock/:ticker",
  );

  return (
    <Box
      pad={
        {
          vertical: "medium",
        }
      }
    >
      {stockView && <StockBreadcrumb />}
      {tradeView && <TradeBreadcrumb />}
    </Box>
  );
};

export default BreadcrumbContainer;
