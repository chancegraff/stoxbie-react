import React from "react";
import {
  getYear,
} from "date-fns";

import {
  StyledContainer,
  StyledText,
} from "./AppCopyright.styled";

type Props = unknown;

const currentYear = getYear(
  new Date(),
);

const FooterName: React.FC<Props> = () =>
{
  return (
    <StyledContainer>
      <StyledText>
        {`© ${currentYear} Chance Technologies, LLC`}
      </StyledText>
    </StyledContainer>
  );
};

export default FooterName;
