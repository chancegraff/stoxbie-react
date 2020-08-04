import { styled } from "baseui/dist";
import { Block } from "baseui/dist/block";
import { Table } from "baseui/dist/table";
import Spinner from "components/BaseUI/Spinner";
import React, { useMemo } from "react";

type Props = {
  trades?: HistoricalTrade[];
};

const Container = styled(
  Block,
  (
    {
      $theme,
    },
  ) => {
    return {
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      margin: `${$theme.sizing.scale800} 0`,
    };
  },
);

const columns = [
  "open",
  "close",
  "changePercent",
  "changeBalance",
];

const BalanceHistory: React.FC<Props> = (
  {
    trades,
  },
) => {
  const safeTrades = useMemo<Array<any>[]>(
    () => {
      if (!trades) {
        return [];
      }

      return trades.map(
        (
          trade,
        ) => {
          return Object.entries(
            trade,
          ).filter(
            (
              [
                key,
              ],
            ) => {
              return columns.includes(
                key,
              );
            },
          );
        },
      );
    },
    [
      trades,
    ],
  );

  if (safeTrades.length === 0) {
    return <Spinner container={Container} />;
  }

  return (
    <Table
      columns={columns}
      data={safeTrades}
    />
  );
};

export default BalanceHistory;
