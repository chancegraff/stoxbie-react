import {
  styled,
} from "baseui/dist";
import {
  Block,
} from "baseui/dist/block";

export const Container = styled(
  Block,
  (
    {
      $theme,
    },
  ) =>
  {
    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: `${$theme.sizing.scale800}`,
      height: `${$theme.sizing.scale800}`,
      borderRadius: "100%",
      border: `2px solid ${$theme.colors.primaryB}`,
    };
  },
);
