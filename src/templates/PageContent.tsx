import React from "react";
import {
  Footer,
  Header,
  Main,
} from "grommet";

type Props = unknown;

const ContentContainer: React.FC<Props> = (
  props,
) =>
{
  return (
    <Main
      height="100%"
      pad={
        {
          vertical: "large",
          horizontal: "xlarge",
        }
      }
    >
      <Header pad="medium" />
      {props.children}
      <Footer pad="medium" />
    </Main>
  );
};

export default ContentContainer;
