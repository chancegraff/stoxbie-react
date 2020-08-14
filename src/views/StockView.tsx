import React from "react";
import {
  useStyletron,
} from "baseui/dist";
import {
  Block,
} from "baseui/dist/block";
import {
  Company, Logo,
} from "iex-cloud";

import PageBreadcrumb from "templates/PageBreadcrumb";
import PageContent from "templates/PageContent";
import PageError from "templates/PageError";
import StockLogo from "components/StockLogo";
import StockName from "components/StockName";
import TradeStart from "components/TradeStart";

type Props = {
  logo?: Logo;
  company?: Company;
  error?: string;
  handleStart: (date: string) => void;
};

const StockView: React.FC<Props> = (
  props,
) =>
{
  const [
    ,
    theme,
  ] = useStyletron();

  if (props.error)
  {
    return (
      <PageError>
        {props.error}
      </PageError>
    );
  }

  return (
    <PageContent>
      <Block
        marginBottom={theme.sizing.scale800}
        width="100%"
      >
        <PageBreadcrumb />
      </Block>
      <Block
        alignItems="flex-end"
        display="flex"
        width="100%"
      >
        <Block>
          <StockLogo logo={props.logo} />
        </Block>
        <Block
          marginLeft={theme.sizing.scale400}
          minHeight="68px"
        >
          <StockName company={props.company} />
        </Block>
        <Block
          marginLeft={theme.sizing.scale600}
          minHeight="52px"
        >
          <TradeStart handleStart={props.handleStart} />
        </Block>
      </Block>
    </PageContent>
  );
};

export default StockView;
