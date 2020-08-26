import React, {
  PropsHasChildren,
} from "react";
import {
  Box,
  Heading,
} from "grommet";

import PageContent from "components/PageTemplates/PageContent";

const Error: React.FC<PropsHasChildren> = (
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
