import React from "react";
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Display3, Caption2 } from "baseui/typography";
import { Avatar } from "baseui/avatar";
import { Logo, Company } from "iex-cloud";

type Props = {
  logo: Logo;
  company: Company;
};

const StockName: React.FC<Props> = (props) => {
  const [, theme] = useStyletron();
  return (
    <Block
      width="100%"
      display="flex"
      alignItems="end"
      margin={`${theme.sizing.scale1200} 0`}
    >
      <Avatar
        name={props.company.companyName}
        src={props.logo.url}
        size={theme.sizing.scale2400}
      />
      <Block margin={theme.sizing.scale400}>
        <Display3>{props.company.companyName}</Display3>
        <Caption2>{props.company.symbol}</Caption2>
      </Block>
    </Block>
  );
};

export default StockName;
