## Express.js CLI Tool

**A powerful, interactive CLI tool for creating production-ready Express.js applications with TypeScript/JavaScript support**

[![npm version](https://badge.fury.io/js/%40excli%2Fexpress.svg)](https://badge.fury.io/js/%40excli%2Fexpress)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

---

## Features

### Core Functionality

- Full TypeScript and JavaScript support with optimized configurations
- Docker containerization with docker-compose setup
- Clean, scalable project architecture following industry best practices
- Pre-configured development tools
- Hot reload development environment

### Database Support

- **MySQL** - Docker configuration with phpMyAdmin
- **PostgreSQL** - Docker configuration with pgAdmin
- **MongoDB** - Docker configuration with Mongo Express

### Admin Panels

- **PostgreSQL** - pgAdmin web interface (Docker)
- **MySQL** - phpMyAdmin web interface (Docker)
- **MongoDB** - Mongo Express web interface (Docker)

## Installation

```bash
npx @excli/express
```

Or install globally:

```bash
npm install -g @excli/express
excli
```

## Requirements

- Node.js >= 20.0.0
- npm, yarn, or pnpm
- Docker (optional, for containerization)

## Quick Start

1. Create a new project:

    ```bash
    npx @excli/express
    ```

2. Follow the interactive prompts to configure:

    - Project name
    - Language (TypeScript/JavaScript)
    - Project Mode (normal, production)
    - Development Tools
    - Docker setup if Project Mode is production
    - Database selection if Project Mode is production (MySQL/PostgreSQL/MongoDB)

3. Navigate to your project:

    ```bash
    cd my-project
    ```

4. Start development server:

    ```bash
    npm run dev
    ```

5. Access your application at http://localhost:3000

## Available Scripts

### TypeScript Projects

- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Start development server with hot reload
- `npm run start` - Start production server
- `npm run format` - Format code with Prettier

### JavaScript Projects

- `npm run dev` - Start development server with hot reload
- `npm run start` - Start production server
- `npm run format` - Format code with Prettier

### Database Scripts

- `npm run docker:up` - Start database and admin panel
- `npm run docker:down` - Stop all services

## Admin Panel Access

Admin panels run in Docker containers and are automatically configured all admin panels share same port number **6969**:

- **pgAdmin** (PostgreSQL): http://localhost:6969
- **phpMyAdmin** (MySQL): http://localhost:6969
- **Mongo Express** (MongoDB): http://localhost:6969

## License

This project is licensed under the ISC License.

## Author

**Noman**

- Email: [pxycknomdictator@gmail.com](mailto:pxycknomdictator@gmail.com)
- GitHub: [@pxycknomdictator](https://github.com/pxycknomdictator)

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Built for developers who value productivity and best practices**
