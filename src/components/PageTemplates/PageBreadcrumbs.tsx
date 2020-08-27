import React from "react";
import {
  useParams,
} from "react-router-dom";

import {
  DateBreadcrumb,
  RootBreadcrumb,
  StyledContainer,
  StyledTheme,
  TickerBreadcrumb,
} from "./PageBreadcrumbs.styled";

const PageBreadcrumbs: React.FC = () =>
{
  const {
    ticker,
    date,
  }: {
    ticker: string;
    date: string;
  } = useParams();

  return (
    <StyledTheme>
      <StyledContainer>
        <RootBreadcrumb />
        <TickerBreadcrumb>
          {ticker}
        </TickerBreadcrumb>
        <DateBreadcrumb>
          {date}
        </DateBreadcrumb>
      </StyledContainer>
    </StyledTheme>
  );
};

export default PageBreadcrumbs;
