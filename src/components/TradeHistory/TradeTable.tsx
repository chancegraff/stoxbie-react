import React from "react";
import {
  DataTable,
} from "grommet";

type Props = {
};

const TradeTable: React.FC<Props> = (
  props,
) =>
{
  return (
    <DataTable
      step={10}
    />
  );
};

export default TradeTable;
