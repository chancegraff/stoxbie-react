import {
  TableToggleCombined,
} from "tests/Components";

export const toggleCombinedShouldChange = (
  toggleState: "visible" | "hidden",
) =>
{
  switch (toggleState)
  {
    case "visible":
    {
      return expect(
        TableToggleCombined(),
      ).toBeInTheDocument();
    }
    case "hidden":
    {
      return expect(
        TableToggleCombined(),
      ).not.toBeInTheDocument();
    }
  }
};
