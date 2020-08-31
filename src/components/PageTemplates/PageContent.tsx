import React from "react";

import AppCopyright from "components/AppBranding/AppCopyright";
import AppLogo from "components/AppBranding/AppLogo";
import PageBreadcrumbs from "components/PageTemplates/PageBreadcrumbs";

import {
  StyledContainer,
  StyledFooter,
  StyledHeader,
  StyledMain,
} from "./PageContent.styled";

const PageContent: React.FC = (
  props,
) =>
{
  return (
    <StyledContainer>
      <StyledHeader>
        <AppLogo />
        <PageBreadcrumbs />
      </StyledHeader>
      <StyledMain>
        {props.children}
      </StyledMain>
      <StyledFooter>
        <AppCopyright />
      </StyledFooter>
    </StyledContainer>
  );
};

PageContent.displayName = "PageContent";

export default PageContent;
