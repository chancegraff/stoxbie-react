import { styled } from "baseui/dist";
import { Block } from "baseui/dist/block";
import {
  StyledCell,
  StyledHeadCell,
  StyledRow,
  StyledTable,
} from "baseui/dist/table";

export const Container = styled(
  Block,
  () =>
  {
    return {
      height: "0%",
      width: "100%",
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  },
);

export const FullTable = styled(
  StyledTable,
  () =>
  {
    return {
      height: "100%",
      width: "100%",
      flexGrow: 1,
    };
  },
);

export const HeadCell = styled(
  StyledHeadCell,
  ({ $theme }) =>
  {
    return { ...$theme.typography.LabelSmall };
  },
);

export const RightAlignedCell = styled(
  StyledCell,
  ({ $theme }) =>
  {
    return {
      display: "flex",
      justifyContent: "flex-end",
      height: "100%",
      borderRight: `1px solid ${$theme.colors.borderOpaque}`,
      ":last-of-type": { borderRight: 0 },
    };
  },
);

export const StickyFooter = styled(
  StyledRow,
  ({ $theme }) =>
  {
    return {
      backgroundColor: $theme.colors.backgroundAlt,
      width: "100%",
    };
  },
);
