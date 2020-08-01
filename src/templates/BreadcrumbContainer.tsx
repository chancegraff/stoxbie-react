import { Breadcrumbs } from "baseui/dist/breadcrumbs";
import { StyledLink } from "baseui/dist/link";
import { format, parse } from "date-fns";
import React, { useMemo } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { URL_DATE_FORMAT } from "services/Constants";

type Props = unknown;

const StockBreadcrumb: React.FC = () => {
  const { ticker } = useParams();

  return (
    <Breadcrumbs>
      <StyledLink $as={Link} to="/">
        {"Ticker Search"}
      </StyledLink>
      <span>{ticker}</span>
    </Breadcrumbs>
  );
};

const TradeBreadcrumb: React.FC = () => {
  const {
    ticker,
    date
  }: {
    ticker: string;
    date: string;
  } = useParams();
  const safeDate = useMemo(
() => {
    const asDate = parse(
date,
      URL_DATE_FORMAT,
      new Date()
);

    return format(
asDate,
      "MMMM do, y"
);
  },
  [date]
);

  return (
    <Breadcrumbs>
      <StyledLink $as={Link} to="/">
        {"Ticker Search"}
      </StyledLink>
      <StyledLink $as={Link} to={`/stock/${ticker}`}>
        {ticker}
      </StyledLink>
      <span>{`Trading from ${safeDate}`}</span>
    </Breadcrumbs>
  );
};

const BreadcrumbContainer: React.FC<Props> = () => {
  const tradeView = useRouteMatch("/trade/:ticker/:date");
  const stockView = useRouteMatch("/stock/:ticker");

  return (
    <>
      {stockView && <StockBreadcrumb />}
      {tradeView && <TradeBreadcrumb />}
    </>
  );
};

export default BreadcrumbContainer;
