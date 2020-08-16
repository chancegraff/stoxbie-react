import React from "react";
import {
  Grommet as GrommetProvider,
} from "grommet";

const theme = {
  name: "StoxTheme",
  rounding: 2,
  spacing: 24,
  defaultMode: "light",
  global: {
    colors: {
      brand: {
        dark: "#FFA62B",
        light: "#4e60af",
      },
      background: {
        dark: "#222222",
        light: "#F8F8F8",
      },
      "background-back": {
        dark: "#010101",
        light: "#FEFEFE",
      },
      "background-front": {
        dark: "#222222",
        light: "#F8F8F8",
      },
      "background-contrast": {
        dark: "#F8F8F811",
        light: "#22222211",
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666",
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC",
      },
    },
    font: {
      family: "\"Mulish\"",
      size: "18px",
      height: "24px",
      maxWidth: "432px",
      face: "/* vietnamese */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/mulish/v1/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNR8aivHZ47LTdNwPak.woff) format('woff');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/mulish/v1/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNR8amvHZ47LTdNwPak.woff) format('woff');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Mulish';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://fonts.gstatic.com/s/mulish/v1/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNR8aevHZ47LTdNwA.woff) format('woff');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n",
    },
    control: {
      border: {
        radius: "2px",
      },
    },
    drop: {
      border: {
        radius: "2px",
      },
    },
    borderSize: {
      xsmall: "1px",
      small: "2px",
      medium: "4px",
      large: "12px",
      xlarge: "24px",
    },
    breakpoints: {
      small: {
        value: 768,
        borderSize: {
          xsmall: "1px",
          small: "2px",
          medium: "4px",
          large: "6px",
          xlarge: "12px",
        },
        edgeSize: {
          none: "0px",
          hair: "1px",
          xxsmall: "2px",
          xsmall: "3px",
          small: "6px",
          medium: "12px",
          large: "24px",
          xlarge: "48px",
        },
        size: {
          xxsmall: "24px",
          xsmall: "48px",
          small: "96px",
          medium: "192px",
          large: "384px",
          xlarge: "768px",
          full: "100%",
        },
      },
      medium: {
        value: 1536,
      },
      large: {},
    },
    edgeSize: {
      none: "0px",
      hair: "1px",
      xxsmall: "3px",
      xsmall: "6px",
      small: "12px",
      medium: "24px",
      large: "48px",
      xlarge: "96px",
      responsiveBreakpoint: "small",
    },
    input: {
      padding: "12px",
      weight: 600,
    },
    spacing: "24px",
    size: {
      xxsmall: "48px",
      xsmall: "96px",
      small: "192px",
      medium: "384px",
      large: "768px",
      xlarge: "1152px",
      xxlarge: "1536px",
      full: "100%",
    },
  },
  heading: {
    level: {
      1: {
        small: {
          size: "42px",
          height: "48px",
          maxWidth: "1008px",
        },
        medium: {
          size: "66px",
          height: "72px",
          maxWidth: "1584px",
        },
        large: {
          size: "114px",
          height: "120px",
          maxWidth: "2736px",
        },
        xlarge: {
          size: "162px",
          height: "168px",
          maxWidth: "3888px",
        },
      },
      2: {
        small: {
          size: "36px",
          height: "42px",
          maxWidth: "864px",
        },
        medium: {
          size: "54px",
          height: "60px",
          maxWidth: "1296px",
        },
        large: {
          size: "72px",
          height: "78px",
          maxWidth: "1728px",
        },
        xlarge: {
          size: "90px",
          height: "96px",
          maxWidth: "2160px",
        },
      },
      3: {
        small: {
          size: "30px",
          height: "36px",
          maxWidth: "720px",
        },
        medium: {
          size: "42px",
          height: "48px",
          maxWidth: "1008px",
        },
        large: {
          size: "54px",
          height: "60px",
          maxWidth: "1296px",
        },
        xlarge: {
          size: "66px",
          height: "72px",
          maxWidth: "1584px",
        },
      },
      4: {
        small: {
          size: "24px",
          height: "30px",
          maxWidth: "576px",
        },
        medium: {
          size: "30px",
          height: "36px",
          maxWidth: "720px",
        },
        large: {
          size: "36px",
          height: "42px",
          maxWidth: "864px",
        },
        xlarge: {
          size: "42px",
          height: "48px",
          maxWidth: "1008px",
        },
      },
      5: {
        small: {
          size: "15px",
          height: "21px",
          maxWidth: "360px",
        },
        medium: {
          size: "15px",
          height: "21px",
          maxWidth: "360px",
        },
        large: {
          size: "15px",
          height: "21px",
          maxWidth: "360px",
        },
        xlarge: {
          size: "15px",
          height: "21px",
          maxWidth: "360px",
        },
      },
      6: {
        small: {
          size: "12px",
          height: "18px",
          maxWidth: "288px",
        },
        medium: {
          size: "12px",
          height: "18px",
          maxWidth: "288px",
        },
        large: {
          size: "12px",
          height: "18px",
          maxWidth: "288px",
        },
        xlarge: {
          size: "12px",
          height: "18px",
          maxWidth: "288px",
        },
      },
    },
    font: {
      family: "\"K2D\"",
    },
  },
  paragraph: {
    small: {
      size: "15px",
      height: "21px",
      maxWidth: "360px",
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "432px",
    },
    large: {
      size: "24px",
      height: "30px",
      maxWidth: "576px",
    },
    xlarge: {
      size: "30px",
      height: "36px",
      maxWidth: "720px",
    },
    xxlarge: {
      size: "42px",
      height: "48px",
      maxWidth: "1008px",
    },
  },
  text: {
    xsmall: {
      size: "12px",
      height: "18px",
      maxWidth: "288px",
    },
    small: {
      size: "15px",
      height: "21px",
      maxWidth: "360px",
    },
    medium: {
      size: "18px",
      height: "24px",
      maxWidth: "432px",
    },
    large: {
      size: "24px",
      height: "30px",
      maxWidth: "576px",
    },
    xlarge: {
      size: "30px",
      height: "36px",
      maxWidth: "720px",
    },
    xxlarge: {
      size: "42px",
      height: "48px",
      maxWidth: "1008px",
    },
  },
  scale: 1.5,
  layer: {
    background: {
      dark: "#222222",
      light: "#F8F8F8",
    },
  },
};

const Grommet: React.FC = (
  props,
) =>
{
  return (
    <GrommetProvider theme={theme}>
      {props.children}
    </GrommetProvider>
  );
};

export default Grommet;
