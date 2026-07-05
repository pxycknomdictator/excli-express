## @excli/express

A CLI tool that scaffolds production-ready Express.js projects with TypeScript, Docker, database integration, ORM, testing, and Git hooks — all pre-configured.

### 🚀 Why @excli/express

Most generators leave you to wire up TypeScript, Docker, databases, ORMs, and tooling by hand. `@excli/express` handles all of it upfront, so you can start building instead of configuring.

### ⚡ Quick Start

No installation required:

```bash
npx @excli/express
```

Or install globally for repeated use:

```bash
npm install -g @excli/express
excli
```

#### Requirements

- Node.js 20 or higher
- A package manager: npm, yarn, pnpm, or bun
- Docker (optional — only needed for database features)

### 🧭 Interactive Setup

The CLI walks you through a guided setup:

1. Project name
2. Language — TypeScript or JavaScript
3. Project mode — Development or Production
4. Dev tools — Git, Prettier, Husky, Vitest, Docker
5. Database type — SQL or NoSQL
6. Database — MySQL, MariaDB, SQLite, PostgreSQL, or MongoDB
7. ORM / ODM — Prisma, Drizzle, TypeORM, Sequelize, Mongoose, or native MongoDB driver
8. Authentication (optional) — Better Auth or Clerk. Better Auth is available with Prisma, Drizzle, and native MongoDB driver
9. Cache — optional Redis support
10. Proxy — Nginx, Caddy, or Traefik
11. Proxy mode — reverse proxy or load balancing
12. Package manager — npm, yarn, pnpm, or bun

### ▶️ Running Your Project

```bash
cd my-project
npm run dev
```

Visit `http://localhost:3000` — your Express server is live.

### 📦 What's Included

#### 🐶 Git Hooks (Husky)

When enabled, Husky sets up Git hooks automatically:

- Pre-commit — runs linting and formatting before every commit
- Pre-push — runs your test suite before pushing to remote
- Commit message validation — enforces the Conventional Commits standard

#### 🗄️ Database Support

Supported databases: MySQL, MariaDB, PostgreSQL, MongoDB, and SQLite. Each comes with a pre-configured admin panel (phpMyAdmin for MySQL/MariaDB, pgAdmin for PostgreSQL, Mongo Express for MongoDB) available at `http://localhost:6969` after running `pnpm run docker:up`. SQLite requires no admin panel. Admin panels may take a moment to initialize on first startup.

#### 🔗 ORM / ODM Support

Prisma, Drizzle, TypeORM, and Sequelize are supported across PostgreSQL, MySQL, MariaDB, and SQLite, with full TypeScript and JavaScript support. Mongoose and native MongoDB drivers are supported for MongoDB only.

#### 🔐 Authentication

Built-in support for two authentication options:

- **[Better Auth](https://www.better-auth.com/)** — a modern, framework-agnostic authentication library. Currently supported with Prisma, Drizzle, and native MongoDB driver adapters. Prisma with MongoDB may have occasional compatibility issues due to limited upstream support, but generally works.
- **[Clerk](https://clerk.com/)** — a drop-in authentication solution with minimal setup, works independently of your chosen ORM.

#### 🐳 Docker Setup

Production mode includes a complete Docker configuration:

- Dockerfile — production-optimized container build
- compose.yaml — multi-service orchestration with correct volume paths
- Separate `.env` files for development and production

#### 🌐 Reverse Proxy Setup

Choose between Nginx, Caddy, or Traefik. All three support reverse proxying and load balancing. Caddy and Traefik provide automatic HTTPS; Nginx requires manual TLS configuration. Nginx suits full control and high-traffic setups, while Caddy and Traefik prioritize simplicity and automatic SSL.

### 🛠️ Common Commands

```bash
pnpm run dev          # Start development server
pnpm run format       # Format code with Prettier
pnpm run build        # Compile TypeScript (TS projects only)
pnpm run docker:up    # Start Docker services
pnpm run docker:down  # Stop all Docker services
```

### 🩹 Troubleshooting

**Port already in use?** Update the ports in your `.env` file to resolve the conflict.

**Docker not starting?** Make sure Docker Desktop is running before executing `pnpm run docker:up`.

**Husky hooks not triggering?** Ensure Git is initialized, then run `pnpm run prepare` to register the hooks.

**Proxy not routing traffic?** Make sure your `compose.yaml` includes the proxy service and that no other process is bound to port 80.

### 🤝 Contributing

Contributions are welcome. Please read the [Contributing Guide](CONTRIBUTING.md) before opening a pull request.

### 📄 License

ISC License — see the [LICENSE](LICENSE) file for details.

### ✍️ Author

**Noman**

- Email: [pxycknomdictator@gmail.com](mailto:pxycknomdictator@gmail.com)
- GitHub: [@pxycknomdictator](https://github.com/pxycknomdictator)
