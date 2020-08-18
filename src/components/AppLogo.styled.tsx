import {
  Image,
  Text,
} from "grommet";
import styled from "styled-components";

export const StyledText = styled(
  Text,
)`
  letter-spacing: -2px;
  text-transform: uppercase;
`;

export const StyledImage = styled(
  Image,
)`
  filter: invert(1);
`;
