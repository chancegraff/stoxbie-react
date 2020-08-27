import React, {
  useMemo,
} from "react";
import {
  useParams,
} from "react-router-dom";

import {
  DateFormats,
  formatParsedDate,
} from "utils/Utilities";

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

  const legibleDate = useMemo(
    () =>
    {
      if (date)
      {
        return formatParsedDate(
          date,
          DateFormats.URL,
          DateFormats.Full,
        );
      }
    },
    [
      date,
    ],
  );

  return (
    <StyledTheme>
      <StyledContainer data-testid="breadcrumbs">
        <RootBreadcrumb />
        <TickerBreadcrumb>
          {ticker}
        </TickerBreadcrumb>
        <DateBreadcrumb>
          {legibleDate}
        </DateBreadcrumb>
      </StyledContainer>
    </StyledTheme>
  );
};

export default PageBreadcrumbs;
