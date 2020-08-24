import React from "react";
import {
  DataTable,
} from "grommet";

type Props = {
};

const HoldingsTable: React.FC<Props> = (
  props,
) =>
{
  return (
    <DataTable
      step={10}
    />
  );
};

export default HoldingsTable;
