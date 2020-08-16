import React from "react";
import {
  Footer,
  Header,
  Main,
} from "grommet";

import PageBreadcrumb from "templates/PageBreadcrumb";

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
      <Header>
        <PageBreadcrumb />
      </Header>
      <Main
        pad={
          {
            vertical: "medium",
          }
        }
      >
        {props.children}
      </Main>
      <Footer>
        Stoxbie
      </Footer>
    </Main>
  );
};

export default ContentContainer;
