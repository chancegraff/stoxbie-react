import React from "react";
import { Logo, Company } from "iex-cloud";
import { useStyletron } from "baseui/dist";
import { Display3 } from "baseui/dist/typography";
import { FlexGridItem } from "baseui/dist/flex-grid";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import StockName from "components/StockName";
import TradeStart from "components/TradeStart";
import ContentContainer from "templates/ContentContainer";

type Props = {
  logo?: Logo;
  company?: Company;
  error?: string;
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
      <FlexGridItem minWidth="100%" paddingBottom={theme.sizing.scale800}>
        <BreadcrumbContainer />
      </FlexGridItem>
      <FlexGridItem>
        <StockName logo={props.logo} company={props.company} />
        <TradeStart />
      </FlexGridItem>
    </ContentContainer>
  );
};

export default StockView;
