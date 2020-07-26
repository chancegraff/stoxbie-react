import React from "react";
import { Breadcrumbs } from "baseui/dist/breadcrumbs";
import { StyledLink } from "baseui/dist/link";
import { Link, useParams, useRouteMatch } from "react-router-dom";

type Props = unknown;

const StockBreadcrumb: React.FC = () => {
  const { ticker } = useParams();
  return (
    <Breadcrumbs>
      <StyledLink $as={Link} to="/">
        Ticker Search
      </StyledLink>
      <span>{ticker}</span>
    </Breadcrumbs>
  );
};

const TradeBreadcrumb: React.FC = () => {
  const { ticker, date } = useParams();
  return (
    <Breadcrumbs>
      <StyledLink $as={Link} to="/">
        Ticker Search
      </StyledLink>
      <StyledLink $as={Link} to={`/stock/${ticker}`}>
        {ticker}
      </StyledLink>
      <span>{date}</span>
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
