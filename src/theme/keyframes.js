import {
  createGlobalStyle,
} from "styled-components";

export default createGlobalStyle`
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

@keyframes full {
  100% {
    width: 100%;
  }
}
`;
