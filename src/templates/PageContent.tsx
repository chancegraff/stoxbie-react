import React from "react";
import {
  Footer,
  Header,
  Main,
} from "grommet";

import PageBreadcrumb from "templates/PageBreadcrumb";
import FooterName from "components/FooterName";

type Props = unknown;

const ContentContainer: React.FC<Props> = (
  props,
) =>
{
  return (
    <Main
      pad={
        {
          vertical: "medium",
          horizontal: "xlarge",
        }
      }
    >
      <Header>
        <PageBreadcrumb />
      </Header>
      <Main flex="shrink">
        {props.children}
      </Main>
      <Footer>
        <FooterName />
      </Footer>
    </Main>
  );
};

export default ContentContainer;
