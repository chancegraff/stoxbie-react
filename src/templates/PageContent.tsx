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
      <Header pad={pad}>
        <PageBreadcrumb />
      </Header>
      <Main
        flex="shrink"
        pad={pad}
      >
        {props.children}
      </Main>
      <Footer
        background="background-front"
        pad={pad}
      >
        <FooterName />
      </Footer>
    </Main>
  );
};

export default ContentContainer;
