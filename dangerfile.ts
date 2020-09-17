import {
  danger,
  message,
  warn,
} from "danger";
import eslint from "danger-plugin-eslint";
import jest from "danger-plugin-jest";

const hasPackageChanges = danger.git.modified_files.some(
  (
    file: string,
  ) =>
  {
    return file === "package.json";
  },
);
const hasLockfileChanges = danger.git.modified_files.some(
  (
    file: string,
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

message(
  `
  #### Changed Files in this PR:
  ${danger.git.modified_files.map(
    (
      file: string,
    ) =>
    {
      return `- ${file}`;
    },
  )}
  `,
);

jest();

eslint();
