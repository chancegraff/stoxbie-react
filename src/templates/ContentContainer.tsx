import React, { useMemo } from "react";
import { useStyletron } from "baseui/dist";
import { Grid } from "baseui/dist/layout-grid";
import { Block } from "baseui/dist/block";

type Props = {
  [key: string]: unknown;
};

const ContentContainer: React.FC<Props> = (props) => {
  const [, theme] = useStyletron();
  const margins = useMemo(
    () => [
      parseInt(theme.sizing.scale800.replace("px", "")),
      parseInt(theme.sizing.scale1200.replace("px", "")),
      parseInt(theme.sizing.scale1600.replace("px", "")),
    ],
    [theme]
  );
  return (
    <Block padding={`${theme.sizing.scale1200} 0`} height="100%">
      <Grid
        gridMargins={margins}
        gridGutters={margins}
        gridMaxWidth={1024}
        gridUnit="px"
      >
        {props.children}
      </Grid>
    </Block>
  );
};

export default ContentContainer;
