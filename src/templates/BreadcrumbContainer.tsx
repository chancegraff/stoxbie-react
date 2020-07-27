import React from "react";
import moment from "moment";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { Breadcrumbs } from "baseui/dist/breadcrumbs";
import { StyledLink } from "baseui/dist/link";
import { TRADE_DATE_FORMAT } from "services/Constants";

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
      <span>{moment(date, TRADE_DATE_FORMAT).format("MMMM Do YYYY")}</span>
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
