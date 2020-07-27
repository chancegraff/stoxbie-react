import React from "react";
import BreadcrumbContainer from "templates/BreadcrumbContainer";
import StockName from "components/StockName";
import TradeStart from "components/TradeStart";
import { Block } from "baseui/dist/block";
import { Logo, Company } from "iex-cloud";
import { Display3 } from "baseui/dist/typography";

type Props = {
  logo?: Logo;
  company?: Company;
  error?: string;
};

const StockView: React.FC<Props> = (props) => {
  if (props.error) {
    return (
      <Block>
        <Display3>
          There was a problem loading the stock you requested.
        </Display3>
      </Block>
    );
  }
  return (
    <Block>
      <BreadcrumbContainer />
      <StockName logo={props.logo} company={props.company} />
      <TradeStart />
    </Block>
  );
};

export default StockView;
