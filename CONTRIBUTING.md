# Contributing to @excli/express

> A CLI tool for scaffolding production-ready Express.js applications with TypeScript/JavaScript, Docker, and database support.

We welcome contributions of all kinds. Whether you're fixing a real bug, improving the CLI experience, adding a new template feature, or refining docs — your work matters. Please read this guide fully before opening a PR.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Testing Your Changes](#testing-your-changes)
- [What Makes a Good PR](#what-makes-a-good-pr)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Code of Conduct](#code-of-conduct)

---

## Prerequisites

Make sure you have the following installed before working on this project:

| Tool    | Version     | Notes                                     |
| ------- | ----------- | ----------------------------------------- |
| Node.js | `>= 20.0.0` | Use LTS — v18 is EOL, do not use it       |
| pnpm    | latest      | `npm i -g pnpm`                           |
| Git     | any recent  | —                                         |
| Docker  | optional    | only needed for database template testing |

> **Why pnpm?** This project uses `pnpm-lock.yaml`. Using npm or yarn will generate a conflicting lockfile and your PR will be rejected. Always use `pnpm`.

---

## Getting Started

### Step 1 — Fork the repository

Go to [github.com/pxycknomdictator/excli-express](https://github.com/pxycknomdictator/excli-express) and click **Fork** (top right). This creates a copy under your own GitHub account.

### Step 2 — Clone your fork

Clone **your fork**, not the original repo:

```bash
git clone https://github.com/YOUR_USERNAME/excli-express.git
cd excli-express
```

### Step 3 — Add the upstream remote

This connects your local clone to the original repo so you can stay in sync:

```bash
git remote add upstream https://github.com/pxycknomdictator/excli-express.git
```

Verify both remotes are set:

```bash
git remote -v
# origin    https://github.com/YOUR_USERNAME/excli-express.git (fetch)
# origin    https://github.com/YOUR_USERNAME/excli-express.git (push)
# upstream  https://github.com/pxycknomdictator/excli-express.git (fetch)
# upstream  https://github.com/pxycknomdictator/excli-express.git (push)
```

### Step 4 — Install dependencies

```bash
pnpm install
```

### Step 5 — Create a new branch

**Never work directly on `main`.** Always create a dedicated branch for your change:

```bash
# First, make sure your main is up to date
git checkout main
git pull upstream main

# Then create your branch
git checkout -b fix/your-branch-name
```

Branch naming convention:

| Type          | Example                    |
| ------------- | -------------------------- |
| Bug fix       | `fix/docker-volume-path`   |
| New feature   | `feat/bun-runtime-support` |
| Documentation | `docs/update-readme-flags` |
| Refactor      | `refactor/cli-prompt-flow` |

### Step 6 — Make your changes

Do your work on this branch. Build and test as you go (see [Testing Your Changes](#testing-your-changes)).

```bash
pnpm run build        # compile TypeScript → dist/
pnpm run start        # start the project
```

### Step 7 — Commit your changes

```bash
git add .
git commit -m "fix(docker): correct PostgreSQL volume mount path"
```

Follow the [Commit Message Guidelines](#commit-message-guidelines). Husky will validate your commit message before it is accepted.

### Step 8 — Sync with upstream before pushing

Before pushing, pull in any new changes from the original repo to avoid conflicts:

```bash
git fetch upstream
git rebase upstream/main
```

Resolve any conflicts if they appear, then continue:

```bash
git rebase --continue
```

### Step 9 — Push your branch

Push to **your fork** (origin), not upstream:

```bash
git push origin fix/your-branch-name
```

### Step 10 — Open a Pull Request

1. Go to your fork on GitHub: `github.com/YOUR_USERNAME/excli-express`
2. GitHub will show a banner: **"Compare & pull request"** — click it
3. Make sure the base is `pxycknomdictator/excli-express → main`
4. Fill in the PR description (see [What Makes a Good PR](#what-makes-a-good-pr))
5. Submit

---

## Project Structure

```
excli-express/
├── src/                  # TypeScript source — CLI logic lives here
│   └── index.ts          # Entry point
├── templates/            # Scaffold files copied into user projects
│   ├── js/               # JavaScript templates
│   └── ts/               # TypeScript templates
├── .husky/               # Git hooks (pre-commit, pre-push)
├── tsconfig.json         # TypeScript compiler config
├── tsdown.config.ts      # tsdown bundler config
├── eslint.config.js      # ESLint flat config
├── .prettierrc           # Prettier rules
└── package.json
```

> **Key point:** Changes inside `templates/` directly affect what users receive when they run `npx @excli/express`. Every template change must be tested end-to-end.

---

## Development Workflow

```bash
pnpm run build      # compile TypeScript to dist/
pnpm run format     # format all files with Prettier
pnpm run start      # start the project
```

---

## Testing Your Changes

There are no automated tests yet. Testing is done manually by running through the CLI prompts. Before opening a PR, walk through every path that your change touches.

### Run the CLI locally

```bash
pnpm run build
pnpm run start
```

### How the CLI prompt flow works

The CLI prompts are sequential and conditional. Some prompts only appear based on previous answers:

| Step | Prompt       | Options                                       | Condition                   |
| ---- | ------------ | --------------------------------------------- | --------------------------- |
| 1    | Project Name | _(any name)_                                  | Always shown                |
| 2    | Language     | TypeScript, JavaScript                        | Always shown                |
| 3    | Mode         | Development, Production                       | Always shown                |
| 4    | Docker       | Yes, No                                       | Only in **Production** mode |
| 5    | Database     | MySQL, MariaDB, PostgreSQL, MongoDB           | Only if **Docker = Yes**    |
| 6    | Redis        | Yes, No                                       | Only if **Docker = Yes**    |
| 7    | ORM          | Prisma, Drizzle, TypeORM, Mongoose, Sequelize | Only if **Docker = Yes**    |

> **Database, Redis, and ORM prompts only appear when Docker is selected in Production mode.** You must reach step 4 and choose Yes to see them.
>
> **ORM compatibility note:** Mongoose is intended for MongoDB. Prisma, Drizzle, TypeORM, and Sequelize work with MySQL, MariaDB, and PostgreSQL. When testing, make sure the selected ORM matches the selected database.

### Minimum test matrix

| Language   | Mode        | Docker | Database   | ORM       | Must verify                                       |
| ---------- | ----------- | ------ | ---------- | --------- | ------------------------------------------------- |
| TypeScript | Development | No     | —          | —         | Basic TS scaffold generates correctly             |
| JavaScript | Development | No     | —          | —         | Basic JS scaffold generates correctly             |
| TypeScript | Production  | Yes    | PostgreSQL | Prisma    | TS + Dockerfile + pgAdmin + Prisma config         |
| TypeScript | Production  | Yes    | PostgreSQL | Drizzle   | TS + Dockerfile + pgAdmin + Drizzle config        |
| TypeScript | Production  | Yes    | PostgreSQL | TypeORM   | TS + Dockerfile + pgAdmin + TypeORM config        |
| JavaScript | Production  | Yes    | MongoDB    | Mongoose  | JS + Dockerfile + Mongo Express + Mongoose config |
| JavaScript | Production  | Yes    | MySQL      | Sequelize | JS + Dockerfile + phpMyAdmin + Sequelize config   |

After scaffolding, go into the generated project and verify it actually runs:

```bash
cd my-generated-project
pnpm install          # if you not install by cli
pnpm run start        # server should start at localhost:3000
pnpm run build        # TypeScript projects only — must compile without errors
```

If your change involves Docker:

```bash
pnpm run docker:up
# visit http://localhost:6969 — admin panel must load
pnpm run docker:down
```

> In your PR description, list exactly which combinations you tested.

---

## What Makes a Good PR

We merge PRs that solve **real problems** or add **clear value**. Before submitting, ask yourself: does this fix something users actually hit, or add something they would genuinely use?

**We will not merge PRs that:**

- Only fix typos or minor grammar (unless they cause genuine confusion)
- Make cosmetic changes with no functional impact
- Refactor working code without a clear reason
- Add dependencies that are not justified

**A strong PR:**

- Has a clear, specific title — `fix(docker): resolve volume path on Windows` not `fixed stuff`
- Explains **what** changed and **why** in the description
- Lists what was tested and how
- Is focused — one fix or one feature per PR, not a mix of both

---

## Coding Standards

- **TypeScript only** in `src/` — no `any` types, be explicit
- **ESM modules** — this project uses `"type": "module"`, use `import/export`, not `require()`
- **Modern Node.js APIs** — use `import.meta.url` and the `URL` constructor instead of `__dirname`; avoid deprecated `fs` callback APIs
- **No unnecessary abstraction** — if a helper is only used once, inline it
- Run `pnpm run format` before every commit — Husky enforces this on pre-commit

---

## Commit Message Guidelines

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Husky enforces this on pre-push.

```
<type>(<scope>): <short imperative description>

[optional body — explain WHY, not WHAT]

[optional footer — breaking changes, issue refs]
```

| Type       | When to use                                     |
| ---------- | ----------------------------------------------- |
| `feat`     | New feature or template option                  |
| `fix`      | Bug fix                                         |
| `docs`     | Documentation only                              |
| `refactor` | Code change that is neither a fix nor a feature |
| `chore`    | Dependency updates, config changes              |
| `test`     | Adding or updating tests                        |

**Good examples:**

```
feat(templates): add Bun runtime option for JavaScript projects

fix(docker): correct PostgreSQL volume mount path on Linux

refactor(cli): replace deprecated fs.exists with fs.access

chore: upgrade tsdown to latest
```

❌ `updated stuff` &nbsp; ❌ `fix bug` &nbsp; ❌ `WIP` — these will be rejected by Husky.

---

## Reporting Bugs

Open an issue using the **Bug Report** template. Include:

- The exact command you ran and which options you selected
- What you expected to happen
- What actually happened — paste the full error output
- Your environment: OS, Node.js version (`node -v`), pnpm version (`pnpm -v`)

The more detail you provide, the faster it gets fixed.

---

## Suggesting Features

Open a **Feature Request** issue and describe:

- The real-world use case (not just "it would be cool")
- What the CLI prompt flow would look like
- Any similar tools or projects that do something comparable

Features that fit the project scope — Express scaffolding, production-readiness, developer experience — are prioritised.

---

## Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md). Be direct, be constructive, be respectful.

---

**Questions?** Open an issue or email [pxycknomdictator@gmail.com](mailto:pxycknomdictator@gmail.com).
