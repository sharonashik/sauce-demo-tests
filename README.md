# SauceDemo E2E Tests

Playwright + TypeScript test framework targeting [SauceDemo](https://www.saucedemo.com).

Built as part of my QA portfolio.

## Stack
- Playwright Test
- TypeScript
- Page Object Model

## Running

```bash
npm install
npx playwright install
npm test
```

## Commands

| Command | What it does |
|---------|--------------|
| `npm test` | Run all tests headless |
| `npm run test:headed` | Run with browser visible |
| `npm run test:ui` | Interactive UI mode |
| `npm run report` | Open the latest HTML report |
| `npm run codegen` | Open Playwright codegen against SauceDemo |

## Structure