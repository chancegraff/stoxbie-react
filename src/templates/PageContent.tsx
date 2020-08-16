import React from "react";
import {
  Footer,
  Header,
  Main,
} from "grommet";

import PageBreadcrumb from "templates/PageBreadcrumb";
import FooterName from "components/FooterName";

type Props = unknown;
const pad = {
  horizontal: "xlarge",
};

const ContentContainer: React.FC<Props> = (
  props,
) =>
{
  return (
    <Main >
      <Header
        background="background-front"
        pad={pad}
      >
        <PageBreadcrumb />
      </Header>
      <Main
        height="auto !important"
        overflow="visible"
        flex="grow"
        pad={
          {
            ...pad,
            vertical: "medium",
          }
        }
      >
        {props.children}
      </Main>
      <Footer
        pad={pad}
      >
        <FooterName />
      </Footer>
    </Main>
  );
};

export default ContentContainer;
