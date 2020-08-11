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
  {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
);

export const FullButton = styled(
  Button,
  {
    width: "100%",
  },
);
