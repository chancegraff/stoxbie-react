import React from "react";
import {
  Text,
} from "grommet";
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
        height="34px !important"
        width="220px !important"
      >
        <Text
          size="xlarge"
          weight="bold"
        >
          {props.company?.companyName}
        </Text>
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
        <Text
          size="xsmall"
          color="text-xweak"
        >
          {props.company?.symbol}
        </Text>
      </Skeleton>
    </>
  );
};

export default StockName;
