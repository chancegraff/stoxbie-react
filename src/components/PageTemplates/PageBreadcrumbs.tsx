import React, {
  useMemo,
} from "react";
import {
  useParams,
} from "react-router-dom";
import {
  JSXTextProps,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  DateFormat,
  formatParsedDate,
} from "utils/Utilities";
import {
  AnchorProps,
} from "components/Grommet/Anchor";

import {
  GrommetContainer,
  GrommetTheme,
  StoxbieDateBreadcrumb,
  StoxbieRootBreadcrumb,
  StoxbieTickerBreadcrumb,
} from "./PageBreadcrumbs.styled";

type Props = JSXTextProps & Omit<AnchorProps, "to">;

export type BreadcrumbProps = Props;

const PageBreadcrumbs: React.FC<Props> = () =>
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
          DateFormat.Url,
          DateFormat.Full,
        );
      }
    },
    [
      date,
    ],
  );

  return (
    <GrommetTheme css="">
      <GrommetContainer
        css=""
        data-testid="breadcrumbs"
      >
        <StoxbieRootBreadcrumb css="">
          Ticker Search
        </StoxbieRootBreadcrumb>
        <StoxbieTickerBreadcrumb css="">
          {ticker}
        </StoxbieTickerBreadcrumb>
        <StoxbieDateBreadcrumb css="">
          {legibleDate}
        </StoxbieDateBreadcrumb>
      </GrommetContainer>
    </GrommetTheme>
  );
};

export default PageBreadcrumbs;
