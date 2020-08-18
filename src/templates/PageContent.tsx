import React from "react";
import {
  Footer,
  Header,
  Main,
} from "grommet";

import PageBreadcrumb from "templates/PageBreadcrumb";
import AppCopyright from "components/AppCopyright";
import AppLogo from "components/AppLogo";

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
        justify="start"
        gap="large"
        pad={
          {
            ...pad,
            vertical: "medium",
          }
        }
      >
        <AppLogo />
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
        <AppCopyright />
      </Footer>
    </Main>
  );
};

export default ContentContainer;
