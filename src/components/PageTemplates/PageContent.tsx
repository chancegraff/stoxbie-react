import React, {
  PropsHasChildren,
} from "react";
import {
  JSXBoxProps,
} from "grommet";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import AppCopyright from "components/AppBranding/AppCopyright";
import AppLogo from "components/AppBranding/AppLogo";
import PageBreadcrumbs from "components/PageTemplates/PageBreadcrumbs";
import PageTheme from "components/PageTemplates/PageTheme";

import {
  GrommetContainer,
  GrommetFooter,
  GrommetHeader,
  GrommetMain,
} from "./PageContent.styled";

type Props = PropsHasChildren & JSXBoxProps;

const PageContent: React.FC<Props> = (
  props,
) =>
{
  return (
    <GrommetContainer css="">
      <GrommetHeader css="">
        <AppLogo css="" />
        <PageBreadcrumbs css="" />
        <PageTheme css="" />
      </GrommetHeader>
      <GrommetMain
        {...props}
        css=""
      />
      <GrommetFooter css="">
        <AppCopyright css="" />
      </GrommetFooter>
    </GrommetContainer>
  );
};

PageContent.displayName = "PageContent";

export default PageContent;
