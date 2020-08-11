import {
  styled,
} from "baseui/dist";
import {
  Block,
} from "baseui/dist/block";
import {
  Button,
} from "baseui/dist/button";

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
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      margin: `${$theme.sizing.scale800} 0`,
    };
  },
);

export const FullButton = styled(
  Button,
  {
    width: "100%",
  },
);
