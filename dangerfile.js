const {
  danger,
  message,
  warn,
} = require(
  "danger",
);
const eslint = require(
  "danger-plugin-eslint",
);
const jest = require(
  "danger-plugin-jest",
);

const hasPackageChanges = danger.git.modified_files.some(
  (
    file,
  ) =>
  {
    return file === "package.json";
  },
);
const hasLockfileChanges = danger.git.modified_files.some(
  (
    file,
  ) =>
  {
    return file === "package-lock.json";
  },
);

if (
  hasPackageChanges &&
  !hasLockfileChanges
)
{
  warn(
    "There are package.json changes with no corresponding lockfile changes",
  );
}

const modifiedMD = danger.git.modified_files.join(
  "- ",
);

message(
  `Changed Files in this PR: \n - ${modifiedMD}`,
);

jest();

eslint();
