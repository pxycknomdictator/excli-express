# 🔥 Expressjs CLI Tool

A powerful, interactive CLI tool for creating Express.js applications with TypeScript/JavaScript support, Docker integration, and essential development tools setup.

[![npm version](https://badge.fury.io/js/%40excli%2Fexpress.svg)](https://badge.fury.io/js/%40excli%2Fexpress)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## 🚀 Quick Start

### Using npx (Recommended)

```bash
npx @excli/express
```

### Global Installation

```bash
npm install -g @excli/express
excli
```

## 📋 Prerequisites

- **Node.js** >= 20.0.0
- **npm** / **yarn** / **pnpm** (your choice)
- **Git** (optional, for version control)
- **Docker** (optional, for containerization)

## 🎯 Getting Started

1. **Create your project:**

   ```bash
   npx @excli/express
   ```

2. **Navigate to your project:**

   ```bash
   cd my-awesome-app
   ```

3. **Start development:**

   **Linux/macOS:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   **Windows (TypeScript projects only):**

   _Open first terminal:_

   ```bash
   npm run build -- --watch
   ```

   _Open second terminal:_

   ```bash
   npm run win:dev
   ```

   _For JavaScript projects on Windows and Linux/MacOs:_

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` 🎉

   > **Note:** The default port is 3000, but you can change it by setting `PORT=6969` in your `.env`

## 🐳 Docker Usage

If you selected Docker during setup:

```bash
# Start services with Docker Compose
npm run db:start

# Stop services
npm run db:stop
```

Your application will be available at `http://localhost:3000` with the database automatically configured.

## 📁 Project Structure

```
my-awesome-app/
├── node_modules/
├── public/
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── types/ (if typescript)
│   ├── utils/
│   ├── app.ts
│   ├── constant.ts
│   └── main.ts
├── .dockerignore
├── .env
├── .env.example
├── .gitignore
├── .prettierignore
├── .prettierrc
├── compose.yaml
├── Dockerfile
├── package.json
└── tsconfig.json (if typescript)
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server on Linux/MacOs
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run win:dev` - Start development server on Windows (TypeScript)

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Noman**

- 📧 Email: pxycknomdictator@gmail.com
- 🐙 GitHub: [@pxycknomdictator](https://github.com/pxycknomdictator)

---

<div align="center" style="margin-top: 20px;">

**🚀 Happy Coding! Build something amazing! ⚡**

_Made with ❤️ by [Noman](https://github.com/pxycknomdictator)_

</div>
