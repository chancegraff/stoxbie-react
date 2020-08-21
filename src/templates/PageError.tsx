import React from "react";
import {
  Box,
  Heading,
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
        <Heading
          size="medium"
          level="1"
        >
          {props.children}
        </Heading>
      </Box>
    </PageContent>
  );
};

export default Error;
