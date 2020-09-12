import {
  TransformableInfo,
} from "logform";
import {
  createLogger as createWinstonLogger,
  format,
} from "winston";
import * as Transport from "winston-transport";

import {
  LOGGER_SEPERATOR,
} from "utils/Constants";
import {
  awakenEnvironment,
  captitalizeString,
} from "utils/Utilities";

enum ServiceColors {
  Blue = "#0000ff",
  Brown = "#a52a2a",
  DarkCyan = "#008b8b",
  DarkGreen = "#006400",
  DarkKhaki = "#bdb76b",
  DarkMagenta = "#8b008b",
  DarkOliveGreen = "#556b2f",
  DarkOrange = "#ff8c00",
  DarkOrchid = "#9932cc",
  DarkSalmon = "#e9967a",
  DarkViolet = "#9400d3",
  Green = "#008000",
  Indigo = "#4b0082",
  Khaki = "#f0e68c",
  LightBlue = "#add8e6",
  LightGreen = "#90ee90",
  LightGrey = "#d3d3d3",
  LightPink = "#ffb6c1",
  Lime = "#00ff00",
  Magenta = "#ff00ff",
  Maroon = "#800000",
  Navy = "#000080",
  Olive = "#808000",
  Orange = "#ffa500",
  Pink = "#ffc0cb",
  Purple = "#800080",
  Red = "#ff0000",
  Yellow = "#ffff00",
}

enum LevelColors {
  Info = "#00ffff",
  Warn = "#ffd700",
  Error = "#8b0000",
}

enum Levels {
  Info = "Info",
  Warn = "Warn",
  Error = "Error",
}

const defaultFont = "color: inherit; font-weight: regular;";
const boldFont = "font-weight: bolder";

const getLevelColorCode = (
  level: Levels,
) =>
{
  return LevelColors[level];
};

const getLabelColorCode = () =>
{
  const keys = Object.keys(
    ServiceColors,
  );
  const randomIndex = Math.floor(
    Math.random() * keys.length,
  );
  const values = Object.values(
    ServiceColors,
  );

  return values[randomIndex];
};

const getLevelKey = (
  info: TransformableInfo,
) =>
{
  return captitalizeString(
    info.level,
  ) as Levels;
};

const getMessage = (
  key: string,
  styles: string[],
) =>
{
  return {
    key,
    styles,
  };
};

const getKey = (
  message: string,
) =>
{
  return `%c${message}%c`;
};

const getSeperator = () =>
{
  const separatorMessage = getMessage(
    getKey(
      LOGGER_SEPERATOR,
    ),
    [
      boldFont,
      defaultFont,
    ],
  );

  return separatorMessage;
};

class Console extends Transport.default
{
  constructor (
    options = {},
  )
  {
    super(
      options,
    );

    this.setMaxListeners(
      30,
    );
  }

  seperator = getSeperator()

  labelColorCode = getLabelColorCode();

  levelMessage (
    info: TransformableInfo,
  )
  {
    const levelKey = getLevelKey(
      info,
    );
    const levelColorCode = getLevelColorCode(
      levelKey,
    );
    const levelFont = `color: ${levelColorCode}; font-weight: bolder;`;
    const levelMessage = getMessage(
      getKey(
        levelKey,
      ),
      [
        levelFont,
        defaultFont,
      ],
    );

    return levelMessage;
  }

  labelMessage (
    info: TransformableInfo,
  )
  {
    const labelFont = `color: ${this.labelColorCode}; font-weight: bolder;`;
    const labelMessage = getMessage(
      getKey(
        info.metadata.label,
      ),
      [
        labelFont,
        defaultFont,
      ],
    );

    return labelMessage;
  }

  log (
    info: TransformableInfo,
    next: () => void,
  )
  {
    const levelMessage = this.levelMessage(
      info,
    );
    const labelMessage = this.labelMessage(
      info,
    );

    const keys = [
      levelMessage.key,
      this.seperator.key,
      labelMessage.key,
      this.seperator.key,
      info.message,
    ].join(
      " ",
    );

    const message = [
      keys,
      ...levelMessage.styles,
      ...this.seperator.styles,
      ...labelMessage.styles,
      ...this.seperator.styles,
    ];

    switch (info.level)
    {
      case "info":
      {
        console.info( // eslint-disable-line no-console
          ...message,
        );
        break;
      }
      case "warn":
      {
        console.warn( // eslint-disable-line no-console
          ...message,
        );
        break;
      }
      case "error":
      {
        console.error( // eslint-disable-line no-console
          ...message,
        );
        break;
      }
    }

    next();
  }
}

export const createLogger = (
  label: string,
) =>
{
  const transports: Transport[] | Transport = [];
  const awakened = awakenEnvironment<Transport>(
    new Console(
      {
        handleExceptions: true,
        level: "info",
        format: format.combine(
          format.label(
            {
              label,
            },
          ),
          format.timestamp(),
          format.metadata(),
        ),
      },
    ),
  );

  if (awakened)
  {
    transports.push(
      awakened,
    );
  }

  return createWinstonLogger(
    {
      transports,
      handleExceptions: true,
    },
  );
};
