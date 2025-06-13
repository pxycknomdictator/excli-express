# 🔥 Express CLI Wizard

> Build your Express.js dreams, faster! ⚡

A powerful, interactive CLI tool for creating Express.js applications with TypeScript/JavaScript support, Docker integration, and essential development tools setup.

## ✨ Features

- 🎯 **Interactive Setup** - Guided project creation with beautiful prompts
- 📝 **TypeScript & JavaScript** - Choose your preferred language
- 🐳 **Docker Ready** - Complete containerization with database support
- 🗄️ **Database Integration** - MySQL, PostgreSQL, and MongoDB support
- 💅 **Code Formatting** - Prettier configuration included
- 🔨 **Git Integration** - Automatic .gitignore setup
- 📦 **Package Manager Choice** - npm, yarn, or pnpm support
- 🚀 **Production Ready** - Best practices and folder structure

## 🚀 Quick Start

### Using npx (Recommended)

```bash
npx express-cli-wizard
```

### Global Installation

```bash
npm install -g express-cli-wizard
express-cli-wizard
```

## 🎮 Usage

Run the command and follow the interactive prompts:

```bash
┌  🔥 Express.js App Generator | Build your dreams, faster! ⚡
│
◇  What should we name your server directory? 🎯
│  my-awesome-app
│
◇  Pick your coding poison:
│  TypeScript
│
◇  🛠️ Setting up core development tools...
│  💅 Prettier, 🐳 Docker (deployment + database), 🔨 Git
│
◇  Alright, pick your poison
│  🍃 MongoDB
│
◇  Which package manager do you want to use?
│  ⚡ pnpm
│
✅ Project created successfully!
```

## 📁 Generated Project Structure

```
my-awesome-app/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── types/          # TypeScript only
│   ├── utils/
│   └── app.ts          # or app.js
├── public/
├── docker-compose.yml  # If Docker selected
├── Dockerfile         # If Docker selected
├── .prettierrc        # If Prettier selected
├── .gitignore         # If Git selected
├── package.json
└── README.md
```

## 🛠️ Development Tools

### Languages

- **TypeScript** - Type-safe development with modern features
- **JavaScript** - Standard ES6+ with best practices

### Development Tools

- **💅 Prettier** - Code formatting and style consistency
- **🔨 Git** - Version control with pre-configured .gitignore
- **🐳 Docker** - Complete containerization setup

### Database Support

- **🐬 MySQL** - Reliable relational database
- **🐘 PostgreSQL** - Advanced SQL database with rich features
- **🍃 MongoDB** - Flexible NoSQL document database

### Package Managers

- **📦 npm** - Node.js default package manager
- **🐱 yarn** - Fast and reliable dependency management
- **⚡ pnpm** - Ultra-fast, disk space efficient

## 📋 Requirements

- **Node.js** >= 20.0.0
- **npm** / **yarn** / **pnpm** (your choice)
- **Git** (optional, for version control)
- **Docker** (optional, for containerization)

## 🎯 Getting Started

After creating your project:

```bash
# Navigate to your project
cd my-awesome-app

# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Your Express server will be running at `http://localhost:3000` 🎉

## 🐳 Docker Usage

If you selected Docker during setup:

```bash
# Start with Docker Compose
docker-compose up -d

# Your app will be available at http://localhost:3000
# Database will be configured automatically
```

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Noman**

- Email: pxycknomdictator@gmail.com
- GitHub: [@pxycknomdictator](https://github.com/pxycknomdictator)

## 🙏 Acknowledgments

- Built with [Clack](https://github.com/natemoo-re/clack) for beautiful CLI prompts
- Inspired by the Express.js community
- Thanks to all contributors and users

<div align="center">

**🚀 Happy Coding! Build something amazing! ⚡**

[Report Bug](https://github.com/pxycknomdictator/express-cli-wizard/issues) · [Request Feature](https://github.com/pxycknomdictator/express-cli-wizard/issues)

</div>
