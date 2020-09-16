import {
  danger,
  message,
  warn,
} from "danger";
import eslint from "danger-plugin-eslint";
import jest from "danger-plugin-jest";
import includes from "lodash.includes";

const hasPackageChanges = includes(
  danger.git.modified_files,
  "package.json",
);
const hasLockfileChanges = includes(
  danger.git.modified_files,
  "package-lock.json",
);

if (hasPackageChanges &&
    !hasLockfileChanges)
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
