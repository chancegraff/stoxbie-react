import {
  combinedBodyShouldChange,
  combinedRowsShouldChange,
  toggleCombinedShouldChange,
} from "tests/Assertions";
import {
  TableCombinedBody,
  TableToggleCombined,
} from "tests/Components";
import {
  clickToggleCombined,
  hoverPresentRow,
} from "tests/Events";

const RowsState = (
  previousState?: "extended" | "retracted",
) =>
{
  const combinedBody = TableCombinedBody();

  return (
    previousState === "retracted" ||
    combinedBody
  )
    ? "extended"
    : "retracted";
};

const CombinedState = (
  previousState?: "visible" | "hidden",
) =>
{
  const toggleCombined = TableToggleCombined();

  return (
    previousState === "hidden" ||
    toggleCombined
  )
    ? "visible"
    : "hidden";
};

export const toggleCombinedRows = (
  previousResult: "extended" | "retracted" = "retracted",
) =>
{
  switch (previousResult)
  {
    case "extended":
    {
      combinedBodyShouldChange(
        "extended",
      );
      combinedRowsShouldChange(
        "extended",
      );
      break;
    }
    case "retracted":
    {
      combinedBodyShouldChange(
        "retracted",
      );
      combinedRowsShouldChange(
        "retracted",
      );
      break;
    }
  }

  hoverPresentRow();

  toggleCombinedShouldChange(
    "visible",
  );

  clickToggleCombined();

  switch (previousResult)
  {
    case "extended":
    {
      combinedBodyShouldChange(
        "retracted",
      );
      combinedRowsShouldChange(
        "retracted",
      );

      return "hidden";
    }
    case "retracted":
    {
      combinedBodyShouldChange(
        "extended",
      );
      combinedRowsShouldChange(
        "extended",
      );

      return "visible";
    }
  }
};
