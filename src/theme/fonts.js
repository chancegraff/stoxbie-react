import {
  createGlobalStyle,
} from "styled-components/macro";

// Catamaran
import CatamaranBlack from "./Catamaran/Catamaran-Black.ttf";
import CatamaranBold from "./Catamaran/Catamaran-Bold.ttf";
import CatamaranExtraBold from "./Catamaran/Catamaran-ExtraBold.ttf";
// Mulish
import MulishBold from "./Mulish/Mulish-Bold.ttf";
import MulishBoldItalic from "./Mulish/Mulish-BoldItalic.ttf";
import MulishItalic from "./Mulish/Mulish-Italic.ttf";
import MulishLight from "./Mulish/Mulish-Light.ttf";
import MulishLightItalic from "./Mulish/Mulish-LightItalic.ttf";
import MulishMedium from "./Mulish/Mulish-Medium.ttf";
import MulishMediumItalic from "./Mulish/Mulish-MediumItalic.ttf";
import MulishRegular from "./Mulish/Mulish-Regular.ttf";
import MulishSemiBold from "./Mulish/Mulish-SemiBold.ttf";
import MulishSemiBoldItalic from "./Mulish/Mulish-SemiBoldItalic.ttf";

export default createGlobalStyle`
@font-face {
  font-family: "Catamaran";
  font-weight: 700;
  font-style: normal;
  src: url(${CatamaranBold}) format("truetype");
}

@font-face {
  font-family: "Catamaran";
  font-weight: 800;
  font-style: normal;
  src: url(${CatamaranExtraBold}) format("truetype");
}

@font-face {
  font-family: "Catamaran";
  font-weight: 900;
  font-style: normal;
  src: url(${CatamaranBlack}) format("truetype");
}

@font-face {
  font-family: "Mulish";
  font-weight: 300;
  font-style: normal;
  src: url(${MulishLight}) format("truetype");
}

@font-face {
  font-family: "Mulish";
  font-weight: 300;
  font-style: italic;
  src: url(${MulishLightItalic}) format("truetype");
}

@font-face {
  font-family: "Mulish";
  font-weight: 400;
  font-style: normal;
  src: url(${MulishRegular}) format("truetype");
}

@font-face {
  font-family: "Mulish";
  font-weight: 400;
  font-style: italic;
  src: url(${MulishItalic}) format("truetype");
}

@font-face {
  font-family: "Mulish";
  font-weight: 500;
  font-style: normal;
  src: url(${MulishMedium}) format("truetype");
}

@font-face {
  font-family: "Mulish";
  font-weight: 500;
  font-style: italic;
  src: url(${MulishMediumItalic}) format("truetype");
}

@font-face {
  font-family: "Mulish";
  font-weight: 600;
  font-style: normal;
  src: url(${MulishSemiBold}) format("truetype");
}

@font-face {
  font-family: "Mulish";
  font-weight: 600;
  font-style: italic;
  src: url(${MulishSemiBoldItalic}) format("truetype");
}

@font-face {
  font-family: "Mulish";
  font-weight: 700;
  font-style: normal;
  src: url(${MulishBold}) format("truetype");
}

@font-face {
  font-family: "Mulish";
  font-weight: 700;
  font-style: italic;
  src: url(${MulishBoldItalic}) format("truetype");
}
`;
