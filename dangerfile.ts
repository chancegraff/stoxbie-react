import eslint from "@seadub/danger-plugin-eslint";
import {
  danger,
  markdown,
  message,
  schedule,
  warn,
} from "danger";
import jest from "danger-plugin-jest";
import todos from "danger-plugin-todos";

schedule(
  todos(),
);

jest();

eslint();

message(
  `
  You've changed ${danger.git.modified_files.length} files while
  adding ${danger.github.pr.additions} lines
  and deleting ${danger.github.pr.deletions} lines.
  `,
);

markdown(
  `
  #### Changed Files in this PR:
  ${danger.git.modified_files.map(
    (
      file: string,
    ) =>
    {
      return `
      - ${file}
      `;
    },
  )}
  `,
);

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
    "`package.json` changes without lockfile changes",
  );
  markdown(
    `
    ### :exclamation: Missing Lockfile Changes
    \`package.json\` was changed but the lockfile wasn't.
    `,
  );
}

const lineChangeThreshold = 600;
const fileChangeThreshold = 20;
const tooManyLineChanges = (
  danger.github.pr.additions + danger.github.pr.deletions > lineChangeThreshold
);
const tooManyFileChanges = (
  danger.git.modified_files.length > fileChangeThreshold
);

switch (true)
{
  case tooManyFileChanges:
  {
    warn(
      `${danger.git.modified_files.length} files changed.`,
    );
    break;
  }
  case tooManyLineChanges:
  {
    warn(
      `${danger.github.pr.additions + danger.github.pr.deletions} lines changed`,
    );
    break;
  }
}

if (
  tooManyFileChanges ||
  tooManyLineChanges
)
{
  markdown(
    `
    ### :exclamation: Too Many Changes
    Split changes into separate PRs.
    `,
  );
}
