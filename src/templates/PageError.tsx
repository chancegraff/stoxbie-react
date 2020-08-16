import React from "react";
import {
  Display3,
} from "baseui/dist/typography";
import {
  Box,
} from "grommet";

import PageContent from "templates/PageContent";

type Props = PropsWithChildren;

const Error: React.FC<Props> = (
  props,
) =>
{
  return (
    <PageContent>
      <Box
        width={
          {
            min: "60%",
            max: "100%",
          }
        }
      >
        <Display3>
          {props.children}
        </Display3>
      </Box>
    </PageContent>
  );
};

export default Error;
