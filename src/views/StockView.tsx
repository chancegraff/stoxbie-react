import React from "react";
import { Logo, Company } from "iex-cloud";
import { useStyletron } from "baseui/dist";
import { Display3 } from "baseui/dist/typography";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import StockName from "components/StockName";
import StockLogo from "components/StockLogo";
import TradeStart from "components/TradeStart";
import ContentContainer from "templates/ContentContainer";
import { Block } from "baseui/dist/block";

type Props = {
  logo?: Logo;
  company?: Company;
  error?: string;
  handleStart: (date: string) => void;
};

const StockView: React.FC<Props> = (props) => {
  const [, theme] = useStyletron();
  if (props.error) {
    return (
      <ContentContainer>
        <Display3>
          There was a problem loading the stock you requested.
        </Display3>
      </ContentContainer>
    );
  }
  return (
    <ContentContainer>
      <Block width="100%" marginBottom={theme.sizing.scale800}>
        <BreadcrumbContainer />
      </Block>
      <Block width="100%" display="flex" alignItems="flex-end">
        <Block>
          <StockLogo logo={props.logo} />
        </Block>
        <Block marginLeft={theme.sizing.scale400} minHeight="68px">
          <StockName company={props.company} />
        </Block>
        <Block marginLeft={theme.sizing.scale600} minHeight="52px">
          <TradeStart handleStart={props.handleStart} />
        </Block>
      </Block>
    </ContentContainer>
  );
};

export default StockView;
