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
      <Header
        pad={
          {
            vertical: "medium",
          }
        }
      >
        <PageBreadcrumb />
      </Header>
      <Main>
        {props.children}
      </Main>
      <Footer
        pad={
          {
            vertical: "medium",
          }
        }
      />
    </Main>
  );
};

export default ContentContainer;
