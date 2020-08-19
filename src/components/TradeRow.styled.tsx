import {
  withStyle,
} from "baseui/dist";
import {
  StyledCell,
} from "baseui/dist/table";

export const RightAlignedCell = withStyle(
  StyledCell,
  {
    display: "flex",
    justifyContent: "flex-end",
  },
);
