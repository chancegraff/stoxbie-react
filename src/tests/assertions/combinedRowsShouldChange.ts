import {
  TableCombinedRows,
} from "tests/Components";

export const combinedRowsShouldChange = (
  rowsState: "extended" | "retracted",
) =>
{
  switch (rowsState)
  {
    case "extended":
    {
      return expect(
        TableCombinedRows(),
      ).not.toHaveLength(
        0,
      );
    }
    case "retracted":
    {
      return expect(
        TableCombinedRows(),
      ).toHaveLength(
        0,
      );
    }
  }
};
