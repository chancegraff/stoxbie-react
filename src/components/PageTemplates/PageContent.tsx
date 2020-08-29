import React from "react";
import {
  Footer,
  Header,
  Main,
} from "grommet";

import AppCopyright from "components/AppBranding/AppCopyright";
import AppLogo from "components/AppBranding/AppLogo";
import PageBreadcrumbs from "components/PageTemplates/PageBreadcrumbs";

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
        background={
          {
            color: "brand",
            opacity: 0.1,
          }
        }
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
        <PageBreadcrumbs />
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
