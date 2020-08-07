import React from "react";
import { Block } from "baseui/dist/block";
import { Display3 } from "baseui/dist/typography";

import PageContent from "templates/PageContent";

type Props = PropsWithChildren;

const Error: React.FC<Props> = (props) =>
{
  return (
    <PageContent>
      <Block
        width={
          [
            "100%",
            "100%",
            "70%",
            "60%",
          ]
        }
      >
        <Display3>
          {props.children}
        </Display3>
      </Block>
    </PageContent>
  );
};

export default Error;
