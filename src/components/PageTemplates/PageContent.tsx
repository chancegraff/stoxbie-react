import React, {
  PropsHasChildren,
} from "react";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import AppCopyright from "components/AppBranding/AppCopyright";
import AppLogo from "components/AppBranding/AppLogo";
import PageBreadcrumbs from "components/PageTemplates/PageBreadcrumbs";

import {
  GrommetContainer,
  GrommetFooter,
  GrommetHeader,
  GrommetMain,
} from "./PageContent.styled";

const PageContent: React.FC<PropsHasChildren> = (
  {
    children,
  },
) =>
{
  return (
    <GrommetContainer css="">
      <GrommetHeader css="">
        <AppLogo css="" />
        <PageBreadcrumbs css="" />
      </GrommetHeader>
      <GrommetMain css="">
        {children}
      </GrommetMain>
      <GrommetFooter css="">
        <AppCopyright css="" />
      </GrommetFooter>
    </GrommetContainer>
  );
};

PageContent.displayName = "PageContent";

export default PageContent;
