<div align="center">

# 🔥 Express.js CLI Tool

**A powerful, interactive CLI tool for creating Express.js applications with TypeScript/JavaScript support**

[![npm version](https://badge.fury.io/js/%40excli%2Fexpress.svg)](https://badge.fury.io/js/%40excli%2Fexpress)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

</div>

---

## ✨ Features

- 🚀 **Quick Setup** - Get your Express app running in seconds

- 💎 **TypeScript/JavaScript** - Choose your preferred language

- 🐳 **Docker Ready** - Optional containerization setup

- 🛠️ **Dev Tools** - Prettier, git, and more pre-configured

- 📁 **Clean Structure** - Well-organized project architecture

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

| Tool              | Version   | Required    |
| ----------------- | --------- | ----------- |
| **Node.js**       | >= 20.0.0 | ✅          |
| **npm/yarn/pnpm** | Latest    | ✅          |
| **Git**           | Latest    | ⚪ Optional |
| **Docker**        | Latest    | ⚪ Optional |

## 🎯 Getting Started

### Step 1: Create Project

```bash
npx @excli/express
```

### Step 2: Navigate to Project

```bash
cd my-awesome-app
```

### Step 3: Start Development

<details>
<summary><strong>🐧 Linux/macOS</strong></summary>

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

</details>

<details>
<summary><strong>🪟 Windows (TypeScript)</strong></summary>

**Terminal 1:**

```bash
npm run build -- --watch
```

**Terminal 2:**

```bash
npm run win:dev
```

</details>

<details>
<summary><strong>🪟 Windows (JavaScript)</strong></summary>

```bash
npm run dev
```

</details>

### Step 4: Open Browser

Navigate to **http://localhost:3000** 🎉

> 💡 **Tip:** Change the port by setting `PORT=6969` in your `.env` file

## 🐳 Docker Commands

If you selected Docker during setup:

```bash
# 🚀 Start services
npm run db:start

# 🛑 Stop services
npm run db:stop
```

## 📁 Project Structure

```
my-awesome-app/
├── 📁 public/                 # Static files
├── 📁 src/
│   ├── 📁 controllers/        # Route controllers
│   ├── 📁 db/                 # Database config
│   ├── 📁 middlewares/        # Custom middlewares
│   ├── 📁 models/             # Data models
│   ├── 📁 routes/             # API routes
│   ├── 📁 services/           # Business logic
│   ├── 📁 types/              # TypeScript types
│   ├── 📁 utils/              # Helper functions
│   ├── 📄 app.ts              # Express app setup
│   ├── 📄 constant.ts         # App constants
│   └── 📄 main.ts             # Entry point
├── 🐳 compose.yaml            # Docker compose
├── 🐳 Dockerfile              # Docker config
├── ⚙️ .env                    # Environment variables
├── 📦 package.json            # Dependencies
└── 📝 tsconfig.json           # TypeScript config
```

## 🛠️ Available Scripts

| Command            | Description                   | Platform       |
| ------------------ | ----------------------------- | -------------- |
| `npm run dev`      | Start development server      | 🐧 Linux/macOS |
| `npm run build`    | Build for production          | 🌐 All         |
| `npm run start`    | Start production server       | 🌐 All         |
| `npm run win:dev`  | Start dev server (TypeScript) | 🪟 Windows     |
| `npm run db:start` | Start Docker services         | 🐳 Docker      |
| `npm run db:stop`  | Stop Docker services          | 🐳 Docker      |

## 📝 License

This project is licensed under the **ISC License**.

---

<div align="center">

### 👤 Author

**Noman**

📧 [pxycknomdictator@gmail.com](mailto:pxycknomdictator@gmail.com) • 🐙 [@pxycknomdictator](https://github.com/pxycknomdictator)

---

**🚀 Happy Coding! Build something amazing! ⚡**

_Made with ❤️ by developers, for developers_

</div>
