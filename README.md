# 🛒 Famshop

A simple and intuitive family grocery shopping list application built with Angular 21. Keep track of your shopping items, mark them as you add them to your cart, and easily manage your grocery lists.

## ✨ Features

- 📝 Add and manage grocery items
- ✅ Mark items as "in cart" while shopping
- 🗑️ Bulk delete purchased items
- 💾 Persistent storage using browser localStorage
- 📱 Clean and responsive interface

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (v11.9.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd famshop
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you make changes to the source files.

## 🏗️ Project Structure

```
src/app/
├── core/
│   ├── models/          # Data models (List, Item)
│   └── services/        # Business logic services
├── features/
│   └── grocery/         # Grocery list feature module
│       ├── pages/       # Page components
│       └── ...
└── shared/              # Shared components and utilities
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server at `http://localhost:4200/` |
| `npm run build` | Build the project for production |
| `npm test` | Run unit tests with Vitest |
| `npm run watch` | Build and watch for changes |

## 🧪 Testing

Run unit tests:
```bash
npm test
```

This project uses [Vitest](https://vitest.dev/) as the test runner.

## 📦 Building for Production

Create an optimized production build:
```bash
npm run build
```

Build artifacts will be stored in the `dist/` directory.

## 🔧 Built With

- [Angular](https://angular.dev/) v21.2.0 - Web framework
- [TypeScript](https://www.typescriptlang.org/) v5.9.2 - Programming language
- [RxJS](https://rxjs.dev/) v7.8.0 - Reactive programming library
- [Vitest](https://vitest.dev/) v4.0.8 - Testing framework

## 📄 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a family project. For major changes, please discuss with the project maintainers first.

---

Built with ❤️ using Angular CLI v21.2.2
