# @excli/express — Modern Express.js Project Generator

> Generate production-ready Express.js applications in seconds — with TypeScript, Docker, databases, ORMs, reverse proxy (Nginx / Caddy), and best practices built-in. The modern alternative to the outdated `express-generator`.

[![npm version](https://badge.fury.io/js/%40excli%2Fexpress.svg)](https://badge.fury.io/js/%40excli%2Fexpress)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript Ready](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

---

## What is @excli/express?

`@excli/express` is a CLI scaffolding tool that generates fully configured, production-ready Express.js projects. Unlike the legacy `express-generator`, this tool gives you a modern development environment with TypeScript support, Docker containerization, database integration, ORM configuration, testing setup, and Git hooks — all from a single command.

No manual configuration. No boilerplate hunting. Just start building.

---

## Why Not Use `express-generator`?

The official `express-generator` was great for its time — but it hasn't kept up with how modern Node.js applications are built.

| Feature             | `express-generator` | `@excli/express`                                 |
| ------------------- | ------------------- | ------------------------------------------------ |
| TypeScript support  | ❌                  | ✅ Native TS & JS                                |
| Docker integration  | ❌                  | ✅ One command                                   |
| Database setup      | ❌                  | ✅ MySQL, PostgreSQL, MongoDB, SQLite, MariaDB   |
| ORM support         | ❌                  | ✅ Prisma, Drizzle, TypeORM, Sequelize, Mongoose |
| Redis / caching     | ❌                  | ✅ Built-in Redis support                        |
| Hot reload (dev)    | ❌                  | ✅ Included                                      |
| Testing setup       | ❌                  | ✅ Vitest + Supertest                            |
| Git hooks (Husky)   | ❌                  | ✅ Pre-commit & pre-push                         |
| Admin DB panels     | ❌                  | ✅ phpMyAdmin, pgAdmin, Mongo Express            |
| Reverse proxy setup | ❌                  | ✅ Nginx & Caddy                                 |
| Load balancing      | ❌                  | ✅ Built-in config                               |
| Modern Node.js APIs | ❌                  | ✅ No deprecated methods                         |
| Actively maintained | ❌                  | ✅                                               |

If you need a project that goes beyond a basic Express server and is ready for real-world use, `@excli/express` is the right choice.

---

## Quick Start

No installation required. Just run:

```bash
npx @excli/express
```

Or install globally for repeated use:

```bash
npm install -g @excli/express
excli
```

### Requirements

- Node.js **20 or higher**
- A package manager: `npm`, `yarn`, `pnpm`, or `bun`
- Docker _(optional — only needed for database features)_

---

## Interactive Setup

The CLI walks you through a short, guided setup:

1. **Project Name** — Name your application
2. **Language** — Choose TypeScript or JavaScript
3. **Project Mode** — Development _(lightweight)_ or Production _(full Docker + database stack)_
4. **Dev Tools** — Select from Git, Prettier, Husky, Vitest, Docker
5. **Database Type** — SQL or NoSQL
6. **Database** — MySQL, MariaDB, SQLite, PostgreSQL, or MongoDB
7. **ORM / ODM** — Choose from Prisma, Drizzle, TypeORM, Sequelize, or Mongoose
8. **Proxy** _(new)_ — Choose Nginx or Caddy
9. **Proxy Mode** _(new)_ — Choose Proxy for reverse proxy and load balancing
10. **Cache** — Enable Redis for in-memory caching

---

## Running Your Project

```bash
# Navigate into your project
cd my-project

# Start the development server
pnpm run dev
```

Visit **http://localhost:3000** — your Express server is live.

---

## What's Included

### Git Hooks with Husky

When enabled, Husky sets up Git hooks automatically to protect your codebase:

- **Pre-commit** — Runs linting and formatting before every commit
- **Pre-push** — Runs your test suite before pushing to remote
- **Commit message validation** — Enforces the Conventional Commits standard

### Database Support

All databases come with a pre-configured admin panel accessible at **http://localhost:6969** after running `pnpm run docker:up`.

| Database   | Admin Panel   | Port |
| ---------- | ------------- | ---- |
| MySQL      | phpMyAdmin    | 6969 |
| MariaDB    | phpMyAdmin    | 6969 |
| PostgreSQL | pgAdmin       | 6969 |
| MongoDB    | Mongo Express | 6969 |
| SQLite     | —             | —    |

> **Note:** Admin panels may take a moment to initialize on first startup.

### ORM / ODM Support

| ORM       | Supported Databases                | TypeScript & JavaScript |
| --------- | ---------------------------------- | ----------------------- |
| Prisma    | PostgreSQL, MySQL, MariaDB, SQLite | ✅                      |
| Drizzle   | PostgreSQL, MySQL, MariaDB, SQLite | ✅                      |
| TypeORM   | PostgreSQL, MySQL, MariaDB, SQLite | ✅                      |
| Sequelize | PostgreSQL, MySQL, MariaDB, SQLite | ✅                      |
| Mongoose  | MongoDB only                       | ✅                      |

### Docker Setup

Production mode includes a complete Docker configuration:

- **Dockerfile** — Production-optimized container build
- **compose.yaml** — Multi-service orchestration with correct volume paths
- **.env files** — Separate environment configs for development and production

### Reverse Proxy Setup _(New)_

When enabled, the CLI generates a ready-to-use reverse proxy configuration alongside your Docker setup — no manual config writing needed.

**Choose between two battle-tested options:**

| Feature               | Nginx                      | Caddy                |
| --------------------- | -------------------------- | -------------------- |
| Reverse proxy         | ✅                         | ✅                   |
| Load balancing        | ✅                         | ✅                   |
| Automatic HTTPS (TLS) | ❌ Manual                  | ✅ Automatic         |
| Config style          | `nginx.conf`               | `Caddyfile`          |
| Best for              | Full control, high-traffic | Simplicity, auto SSL |

## Common Commands

```bash
# Start the development server
pnpm run dev

# Format code with Prettier
pnpm run format

# Compile TypeScript to JavaScript (TS projects only)
pnpm run build

# Start Docker services (database + admin panel + proxy)
pnpm run docker:up

# Stop all Docker services
pnpm run docker:down
```

---

## Troubleshooting

**Port already in use?**
Another service may be running on port `3000` or `6969`. Update the ports in your `.env` file to resolve the conflict.

**Docker not starting?**
Make sure Docker Desktop is running before executing `pnpm run docker:up`.

**Husky hooks not triggering?**
Ensure Git is initialized in your project, then run `pnpm run prepare` to register the hooks.

**Proxy not routing traffic?**
Make sure your `docker-compose.yml` includes the proxy service and that no other process is bound to port `80`. For Caddy with a real domain, ensure DNS is pointed correctly before starting.

---

## Contributing

Contributions are welcome. Please read the [Contributing Guide](CONTRIBUTING.md) before opening a pull request.

---

## License

ISC License — see the [LICENSE](LICENSE) file for details.

---

## Author

**Noman**

- 📧 [pxycknomdictator@gmail.com](mailto:pxycknomdictator@gmail.com)
- 🐙 [@pxycknomdictator](https://github.com/pxycknomdictator)

---

Built with ❤️ for developers who want to skip the setup and start shipping.
