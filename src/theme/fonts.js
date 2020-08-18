import {
  createGlobalStyle,
} from "styled-components";

// K2D
import K2DBold from "./K2D/K2D-Bold.ttf";
import K2DBoldItalic from "./K2D/K2D-BoldItalic.ttf";
import K2DExtraBold from "./K2D/K2D-ExtraBold.ttf";
import K2DExtraBoldItalic from "./K2D/K2D-ExtraBoldItalic.ttf";
import K2DMedium from "./K2D/K2D-Medium.ttf";
import K2DMediumItalic from "./K2D/K2D-MediumItalic.ttf";
import K2DSemiBold from "./K2D/K2D-SemiBold.ttf";
import K2DSemiBoldItalic from "./K2D/K2D-SemiBoldItalic.ttf";
// Khula
import KhulaExtraBold from "./Khula/Khula-ExtraBold.ttf";
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
  font-family: "K2D";
  font-weight: 500;
  font-style: normal;
  src: url(${K2DMedium}) format("truetype");
}

@font-face {
  font-family: "K2D";
  font-weight: 500;
  font-style: italic;
  src: url(${K2DMediumItalic}) format("truetype");
}

@font-face {
  font-family: "K2D";
  font-weight: 600;
  font-style: normal;
  src: url(${K2DSemiBold}) format("truetype");
}

@font-face {
  font-family: "K2D";
  font-weight: 600;
  font-style: italic;
  src: url(${K2DSemiBoldItalic}) format("truetype");
}

@font-face {
  font-family: "K2D";
  font-weight: 700;
  font-style: normal;
  src: url(${K2DBold}) format("truetype");
}

@font-face {
  font-family: "K2D";
  font-weight: 700;
  font-style: italic;
  src: url(${K2DBoldItalic}) format("truetype");
}

@font-face {
  font-family: "K2D";
  font-weight: 800;
  font-style: normal;
  src: url(${K2DExtraBold}) format("truetype");
}

@font-face {
  font-family: "K2D";
  font-weight: 800;
  font-style: italic;
  src: url(${K2DExtraBoldItalic}) format("truetype");
}

@font-face {
  font-family: "Khula";
  font-weight: normal;
  font-style: normal;
  src: url(${KhulaExtraBold}) format("truetype");
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
