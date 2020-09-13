import {
  combinedBodyShouldChange,
  combinedRowsShouldChange,
  toggleCombinedShouldChange,
} from "tests/Assertions";
import {
  clickToggleCombined,
  hoverPresentRow,
} from "tests/Events";

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

  toggleCombinedShouldChange(
    "hidden",
  );

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

      return "retracted";
    }
    case "retracted":
    {
      combinedBodyShouldChange(
        "extended",
      );
      combinedRowsShouldChange(
        "extended",
      );

      return "extended";
    }
  }
};
