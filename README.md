### Express.js CLI Tool

A powerful express generator tool for creating production-ready Express.js applications with TypeScript/JavaScript support, complete with Docker containerization and database management.

[![npm version](https://badge.fury.io/js/%40excli%2Fexpress.svg)](https://badge.fury.io/js/%40excli%2Fexpress)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

---

### Why Choose This Generator?

Start building features immediately with a complete, production-ready Express.js project using industry best practices.

**Built for modern development:**

- 🚀 TypeScript or JavaScript support
- 🐳 Docker-ready with one command
- 🗄️ Pre-configured databases (MySQL, PostgreSQL, MongoDB)
- 🔥 Hot reload for rapid development
- 📦 Clean, scalable architecture
- 🛠️ Admin panels included for database management
- 🐶 Husky integration for Git hooks
- ⚡ Modern Node.js APIs (no deprecated methods)

---

### Getting Started

No installation needed! Just run:

```bash
npx @excli/express
```

**Or install globally:**

```bash
npm install -g @excli/express
excli
```

#### Requirements

- Node.js 20 or higher
- npm, yarn, pnpm or bun
- Docker (optional - only needed for database features)

---

### Usage

#### Creating Your Project

Run the CLI and answer a few simple questions:

```bash
npx @excli/express
```

**You'll be asked about:**

1. **Project Name** - What to call your new application
2. **Language** - TypeScript or JavaScript
3. **Project Mode** - Normal (basic setup) or Production (includes Docker & databases)
4. **Development Tools** - Git, Prettier, Docker, Husky
5. **Database** - Choose MySQL, MariaDB, PostgreSQL, or MongoDB (production mode only)

### Starting Your Application

After project creation:

```bash
# Navigate to your project
cd my-project

# Start the development server
npm run dev

# Open your browser at http://localhost:3000
```

That's it! Your Express server is running with hot reload enabled.

---

### What's Included

#### Husky Integration

When enabled, Husky automatically sets up Git hooks to maintain code quality:

- **Pre-commit hook** - Runs linting and formatting checks before commits
- **Pre-push hook** - Ensures tests pass before pushing to remote
- **Commit message validation** - Enforces conventional commit standards

#### Database Options

Choose the database that fits your needs:

| Database       | Admin Panel   | Admin Panel Port |
| -------------- | ------------- | ---------------- |
| **MySQL**      | phpMyAdmin    | 6969             |
| **MariaDB**    | phpMyAdmin    | 6969             |
| **PostgreSQL** | pgAdmin       | 6969             |
| **MongoDB**    | Mongo Express | 6969             |

All admin panels are accessible at `http://localhost:6969` after running `npm run docker:up`.

> **Note:** Some admin panels might take a minute to initialize. Why? Great question! I wish I knew. Please be patient during first startup while they contemplate the meaning of life.

### Docker & Environment Files

Your project includes pre-configured Docker setup:

- **Dockerfile** - Production-ready container configuration
- **.env files** - Environment variables for different environments
- **docker-compose.yml** - Multi-service orchestration with proper volume paths

> **Important:** PostgreSQL volume path has been fixed in the latest version to ensure proper data persistence across container restarts.

---

### Common Commands

#### Development

```bash
npm run dev          # Start development server with hot reload
npm run start        # Start production server
npm run format       # Format code with Prettier
```

#### TypeScript Projects

```bash
npm run build        # Compile TypeScript to JavaScript
```

#### Docker & Databases

```bash
npm run docker:up    # Start database and admin panel
npm run docker:down  # Stop all Docker services
```

---

### Managing Your Database

After running `npm run docker:up`, access your database admin panel at **http://localhost:6969**

- **pgAdmin** - Full-featured PostgreSQL management
- **phpMyAdmin** - Intuitive MySQL & MariaDB interface
- **Mongo Express** - Simple MongoDB administration

---

### Recent Updates

#### Version Improvements

- ✅ Fixed PostgreSQL volume path in Docker configuration for proper data persistence
- ✅ Added production-ready Dockerfile
- ✅ Improved environment variable management
- ✅ Modern Node.js APIs (no deprecated methods)
- ✅ Cross-platform compatibility improvements

---

### Troubleshooting

**Port already in use?**
Check if another service is running on port 3000 or 6969, or modify the ports in your `.env` file.

**Docker issues?**
Make sure Docker Desktop is running before executing `npm run docker:up`.

**Husky hooks not running?**
Ensure Git is initialized and add a valid script in `.husky/pre-commit` file, then run `npm run prepare` to set up hooks.

**Need help?**
Open an issue on GitHub with details about your problem.

---

### Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

### License

ISC License - see LICENSE file for details.

### Author

**Noman**  
📧 [pxycknomdictator@gmail.com](mailto:pxycknomdictator@gmail.com)  
🐙 [@pxycknomdictator](https://github.com/pxycknomdictator)

---

**Happy coding! Built with ❤️ for developers who value productivity.**
