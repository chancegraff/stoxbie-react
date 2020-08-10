import React from "react";
import { useStyletron } from "baseui/dist";
import {
  Caption2,
  Display3,
} from "baseui/dist/typography";
import { Company } from "iex-cloud";

import { DetailsSkeleton } from "./StockName.loading";

type Props = {
  company?: Company;
};

const StockName: React.FC<Props> = (props) =>
{
  const [
    , theme,
  ] = useStyletron();

  if (!props.company)
  {
    return <DetailsSkeleton height={theme.sizing.scale2400} />;
  }

  return (
    <>
      <Display3>
        {props.company.companyName}
      </Display3>
      <Caption2>
        {props.company.symbol}
      </Caption2>
    </>
  );
};

export default StockName;
