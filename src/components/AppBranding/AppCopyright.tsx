import React from "react";
import {
  getYear,
} from "date-fns";
import styled from "styled-components/macro"; // eslint-disable-line @typescript-eslint/no-unused-vars

import {
  GrommetContainer,
  GrommetText,
} from "./AppCopyright.styled";

type Props = unknown;

const currentYear = getYear(
  new Date(),
);

const FooterName: React.FC<Props> = () =>
{
  return (
    <GrommetContainer css="">
      <GrommetText css="">
        {`© ${currentYear} Chance Technologies, LLC`}
      </GrommetText>
    </GrommetContainer>
  );
};

export default FooterName;
