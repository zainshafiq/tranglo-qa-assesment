## Tranglo QA Assessment – Web UI & API Automation

This repository contains automated test scripts for both Web UI and API layers using Playwright with TypeScript.

### 📦 Setup
- Run command: npm install

### ▶️ Run Tests
- Run command: npx playwright test

### 📊 View Report
- After running tests:
- Run command: npx playwright show-report
- This will open the Playwright HTML report showing test results.

### 🎥 Record Test (Codegen)
- Run command: npx playwright codegen

### 🧪 Test Coverage
- Web UI automation (Login and Purchase flow)
- API automation (CRUD operations)

### ⚙️ Tech Stack
- Playwright
- TypeScript
- GitHub Actions (CI)

### 📁 Project Structure
```
tranglo-qa-assessment/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline configuration
├── tests/
│   ├── api/
│   │   └── api.spec.ts            # API CRUD operations test suite
│   └── ui/
│       └── purchase.spec.ts       # Web UI purchase flow test
├── utils/
│   ├── login-helper.ts            # Login utilities and helper functions
│   └── test-data.ts               # Test data constants and fixtures
├── playwright-report/             # Generated HTML test reports
├── test-results/                  # Test execution results
├── .gitignore                      # Git ignore rules
├── package.json                   # Project dependencies
├── package-lock.json              # Locked dependency versions
├── playwright.config.ts           # Playwright configuration
└── README.md                       # This file
```

### 📄 File Descriptions
- **api.spec.ts**: Comprehensive CRUD API tests (Create, Read, Update, Delete) for JSONPlaceholder API
- **purchase.spec.ts**: End-to-end UI tests for the purchase flow
- **login-helper.ts**: Reusable helper functions for authentication flows
- **test-data.ts**: Centralized test data and constants
- **playwright.config.ts**: Playwright runner configuration (browsers, timeout, reporting)
