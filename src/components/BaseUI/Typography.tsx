import React from "react";
import { Display3 } from "baseui/dist/typography";
import ContentContainer from "templates/ContentContainer";
import { Block } from "baseui/dist/block";

type Props = PropsWithChildren;

const Error: React.FC<Props> = props => (
  <ContentContainer>
    <Block
      width={[
        "100%",
        "100%",
        "70%",
        "60%",
      ]}
    >
      <Display3>
        {
          props.children
        }
      </Display3>
    </Block>
  </ContentContainer>
);

export default Error;
