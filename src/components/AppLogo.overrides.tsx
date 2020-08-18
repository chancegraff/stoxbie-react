import {
  Link,
} from "react-router-dom";
import {
  Image,
  Text,
} from "grommet";
import styled from "styled-components";

export const LogoText = styled(
  Text,
)`
  font-family: 'Catamaran';
  letter-spacing: -2px;
  text-transform: uppercase;
`;

export const LogoImage = styled(
  Image,
)`
  filter: invert(1);
`;

export const LogoLink = styled(
  Link,
)`
  text-decoration: none;
`;
