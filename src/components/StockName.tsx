import React from "react";
import {
  Caption2,
  Display3,
} from "baseui/dist/typography";
import {
  Company,
} from "iex-cloud";

import Skeleton from "components/Grommet/Skeleton";

type Props = {
  company?: Company;
};

const StockName: React.FC<Props> = (
  props,
) =>
{
  return (
    <>
      <Skeleton
        on={!props.company}
        height="44px !important"
        width="220px !important"
      >
        <Display3>
          {props.company?.companyName}
        </Display3>
      </Skeleton>
      <Skeleton
        on={!props.company}
        height="14px !important"
        width="60px !important"
        margin={
          {
            top: "4px",
          }
        }
      >
        <Caption2>
          {props.company?.symbol}
        </Caption2>
      </Skeleton>
    </>
  );
};

export default StockName;
