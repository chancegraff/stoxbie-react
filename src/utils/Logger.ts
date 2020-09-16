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
  hashString,
} from "utils/Utilities";

enum ServiceColors {
  DarkCyan = "#008b8b",
  DarkKhaki = "#bdb76b",
  DarkSalmon = "#e9967a",
  LightBlue = "#add8e6",
  LightGreen = "#90ee90",
  LightGrey = "#d3d3d3",
  LightPink = "#ffb6c1",
}

enum LevelColors {
  Debug = "inherit",
  Info = "#00ffff",
  Warn = "#ffd700",
  Error = "#ff2b00",
}

enum Levels {
  Debug = "Debug",
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

const getLabelColorCode = (
  label: string,
) =>
{
  const keys = Object.keys(
    ServiceColors,
  );
  const values = Object.values(
    ServiceColors,
  );
  const charactersAsInt = hashString(
    label,
  );
  const charactersAsIndex = charactersAsInt % keys.length;

  return values[charactersAsIndex];
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
    const labelFont = `color: ${info.metadata.color}; font-weight: bolder;`;
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

    const {
      metadata: {
        label,
        color,
        ...metadata
      },
    } = info;

    if (
      Object.keys(
        metadata,
      ).length > 0
    )
    {
      message.push(
        metadata,
      );
    }

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
      case "debug":
      {
        console.debug( // eslint-disable-line no-console
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
  const color = getLabelColorCode(
    label,
  );
  const transports: Transport[] | Transport = [];
  const awakened = awakenEnvironment<Transport>(
    new Console(
      {
        handleExceptions: true,
        level: "debug",
        format: format.combine(
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
      defaultMeta: {
        label,
        color,
      },
    },
  );
};
