import {
  TableCombinedBody,
} from "tests/Components";

export const combinedBodyShouldChange = (
  rowsState: "extended" | "retracted",
) =>
{
  switch (rowsState)
  {
    case "extended":
    {
      return expect(
        TableCombinedBody(),
      ).toBeInTheDocument();
    }
    case "retracted":
    {
      return expect(
        TableCombinedBody(),
      ).not.toBeInTheDocument();
    }
  }
};
