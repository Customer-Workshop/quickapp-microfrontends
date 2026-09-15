# End-to-End Tests (Playwright)

Playwright e2e tests for the shell + remote micro-frontends. Tests live in
`e2e/tests/`; shared remote metadata lives in `e2e/helpers/remotes.ts`.

## Setup

```bash
# Install dependencies for the root project and all five apps
npm run install:all

# Install the Chromium browser used by Playwright
npx playwright install --with-deps chromium
# (without sudo, use: npx playwright install chromium)
```

## Run

```bash
npm run test:e2e
```

The Playwright config starts all five dev servers automatically
(`npm run start:shell`, `start:identity`, `start:customer`, `start:order`,
`start:product` on ports 4200–4204) and reuses already-running servers when
not on CI.

### Custom base URL

```bash
BASE_URL=http://localhost:4200 npm run test:e2e
# or
PLAYWRIGHT_BASE_URL=http://localhost:4200 npm run test:e2e
```

### Headed / UI mode

```bash
npx playwright test -c e2e/playwright.config.ts --headed
npx playwright test -c e2e/playwright.config.ts --ui
```

The HTML report is written to `playwright-report/` and test artifacts to
`test-results/` (both git-ignored).
