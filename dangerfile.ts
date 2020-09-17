import {
  danger,
  markdown,
  message,
  schedule,
  warn,
} from "danger";
import todos from "danger-plugin-todos";

const packageChanges = () =>
{
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
  ### :warning: Missing Lockfile Changes
  \`package.json\` was changed but the lockfile wasn't.
  `,
    );
  }
};

const scopeCreep = () =>
{
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
  ### :warning: Scope Creep
  Split some of these changes into a separate PR.
  `,
    );
  }
};

const changedFiles = () =>
{
  markdown(
    `
  ### :briefcase: Changed Files
  You've changed ${danger.git.modified_files.length} files while adding ${danger.github.pr.additions} lines and deleting ${danger.github.pr.deletions} lines.
  ${
  danger.git.modified_files.reduce(
    (
      finalString,
      currentFile,
    ) =>
    {
      return `
  ${finalString}
  - ${danger.utils.href(
    currentFile,
    currentFile,
  )}
  `;
    },
    "",
  )
  }
  `,
  );
};

const main = () =>
{
  if (
    danger.github.pr.title.includes(
      "#trivial",
    ) ||
    danger.github.pr.body.includes(
      "#trivial",
    )
  )
  {
    message(
      "Trivial PR detected, disregarding Danger",
    );

    return;
  }

  schedule(
    todos(
      {
        keywords: [
          "todo",
        ],
      },
    ),
  );

  packageChanges();
  scopeCreep();
  changedFiles();
};

main();
