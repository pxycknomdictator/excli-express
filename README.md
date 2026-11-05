## Express Generator

A CLI tool that scaffolds production-ready Express.js projects with TypeScript, Docker, database integration, ORM, and authentication, all pre-configured.

[![npm version](https://badge.fury.io/js/%40excli%2Fexpress.svg)](https://badge.fury.io/js/%40excli%2Fexpress)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Quick Start

```bash
npx @excli/express
```

Or install globally:

```bash
npm install -g @excli/express
excli
```

### Requirements

- Node.js 20 or higher
- npm, yarn, pnpm, or bun
- Docker (optional, only needed for database features)

## Interactive Setup

The CLI walks you through these choices:

1. Project name
2. Language: TypeScript or JavaScript
3. Project mode: Development or Production
4. Dev tools: Git, Vite+, Docker, Logger
5. Logger: Winston or Pino
6. Database type: SQL or NoSQL
7. Database: MySQL, MariaDB, SQLite, PostgreSQL, or MongoDB
8. Database library category: ORM / ODM or Query Builder
9. ORM / ODM or Query Builder: Drizzle, TypeORM, Sequelize, Kysely, Mongoose, or the native MongoDB driver
10. Authentication (optional): Better Auth or Clerk
11. Cache (optional): Redis
12. Proxy: Nginx, Caddy, or Traefik
13. Proxy mode: reverse proxy or load balancing
14. Package manager: npm, yarn, pnpm, or bun

## Running Your Project

```bash
cd my-project
npm run dev
```

Your server will be live at `http://localhost:3000`.

## Features

### Databases

MySQL, MariaDB, PostgreSQL, MongoDB, and SQLite are supported. Each has a pre-configured admin panel at `http://localhost:6969` after you run `npm run db:up`:

| Database        | Admin Panel   |
| --------------- | ------------- |
| MySQL / MariaDB | phpMyAdmin    |
| PostgreSQL      | pgAdmin       |
| MongoDB         | Mongo Express |
| SQLite          | None needed   |

Admin panels may take a moment to initialize on first startup.

### ORM / ODM

| Tool                            | Databases                          |
| ------------------------------- | ---------------------------------- |
| Drizzle, TypeORM, Sequelize     | PostgreSQL, MySQL, MariaDB, SQLite |
| Mongoose, native MongoDB driver | MongoDB only                       |

### Query Builder

| Tool   | Databases                          |
| ------ | ---------------------------------- |
| Kysely | PostgreSQL, MySQL, MariaDB, SQLite |

### Authentication

- **[Better Auth](https://www.better-auth.com/)**: available with Drizzle and the native MongoDB driver.
- **[Clerk](https://clerk.com/)**: works independently of your chosen ORM.

### Docker

Production mode generates:

- `Dockerfile`: production-optimized build
- `compose.yaml`: multi-service setup
- `.env`: development environment variables
- `.env.production`: production environment variables (created in production mode)

### Reverse Proxy

Nginx, Caddy, and Traefik all support reverse proxying and load balancing. Caddy and Traefik provide automatic HTTPS, while Nginx requires manual TLS configuration but gives you more control.

## Commands

```bash
npm run dev           # Start development server
npm run format        # Format code with Vite+
npm run build         # Compile TypeScript (TS projects only)
npm run db:up         # Start database services (development)
npm run db:down       # Stop database services (development)
npm run db:prod:up    # Start database services (production)
npm run db:prod:down  # Stop database services (production)
```

Use the equivalent command for your chosen package manager.

## Troubleshooting

**Port already in use?**
Change the ports in your `.env` file.

**Docker not starting?**
Make sure Docker Desktop is running before `npm run db:up`.

**Proxy not routing traffic?**
Check that `compose.yaml` includes the proxy service and that nothing else is bound to port 80.

## Contributing

Contributions are welcome. Please read the [Contributing Guide](CONTRIBUTING.md) before opening a pull request.

## License

ISC. See the [LICENSE](LICENSE) file for details.

## Author

**Noman**
[pxycknomdictator@gmail.com](mailto:pxycknomdictator@gmail.com) | [@pxycknomdictator](https://github.com/pxycknomdictator)
