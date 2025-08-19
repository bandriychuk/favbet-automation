# Favbet Automation

## Overview

End-to-end test automation project built with [Playwright](https://playwright.dev/) and Node.js.
This project provides a simple setup for running UI tests across different browsers with support for debugging, code generation, and UI mode.

---

## 📦 Installation

1. Install [Node.js](https://nodejs.org/) (recommended version 20+).
2. Install [pnpm](https://pnpm.io/installation) **version 10.14.0** (other versions may not be compatible).
    - Check your version:
      ```bash
      pnpm -v
      ```
    - If needed, update to the required version:
      ```bash
      npm install -g pnpm@10.14.0
      ```
3. Install project dependencies:
```bash
pnpm install
```

---

## ▶️ Scripts

Available commands:

- **Run all tests**
```bash
pnpm test
```

- **Run tests in UI mode**
```bash
pnpm run ui-mode
```

- **Run tests only in Chromium**
```bash
pnpm run project-chrome
```

- **Run tests in debug mode (with tag `@a`)**
```bash
pnpm run debug
```

- **Generate tests using Playwright Codegen**
```bash
pnpm run code-gen
```

---

## 🧪 Running Tests

By default, tests are executed using [Playwright Test](https://playwright.dev/docs/test-intro).
Test files should be placed in the `tests/` directory (or another path defined in `playwright.config.ts`).

### Run a single test
```bash
pnpm exec playwright test tests/example.spec.ts
```

### Run tests in specific browsers
```bash
pnpm exec playwright test --project=chromium
pnpm exec playwright test --project=firefox
pnpm exec playwright test --project=webkit
```

---

## 📂 Project Structure

```
favbet-automation/
│── tests/                 # Test files
│   ├── example.test.ts    # Example test
│
│── app/
│   ├── component          # POM for app page components
│   ├── page               # POM for app pages
│   ├── social             # POM for Social Networks
│   ├── abstractClasses    # Page initialization
│   ├── index.ts           # Access to all pages
|
│── fixtures/              # Test data / fixtures
│── playwright.config.ts   # Playwright configuration
│── package.json           # Project metadata and scripts
│── README.md              # Documentation
```

---

## ⚙️ Tech Stack

- [Playwright](https://playwright.dev/) — modern E2E testing framework
- [TypeScript](https://www.typescriptlang.org/) (via `@types/node`)
- [pnpm](https://pnpm.io/) — fast and efficient package manager (**10.14.0 required**)

---

## 📖 Useful Links

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [pnpm Documentation](https://pnpm.io/motivation)

---

💡 Tips:
- Use `@tag` annotations in tests to filter runs.
- Run `pnpm run ui-mode` for interactive test execution.
