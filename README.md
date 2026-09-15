# Decomposed Angular Micro-Frontends — Target State

This repository is the **target scaffolding** for decomposing the monolithic Angular frontend into independently deployable micro-frontends using Webpack Module Federation, deployed on Kubernetes.

## Source Monolith

The before-state monolith lives in [`app_dotnet_angular_containerized_decomposition_monolith`](https://github.com/Cognition-Partner-Workshops/app_dotnet_angular_containerized_decomposition_monolith) (the `quickapp.client/` directory contains the Angular monolith).

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Shell Application                     │
│    (Host — layout, routing, auth, shared state)          │
│                                                          │
│  ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌──────────────┐ │
│  │ Identity │ │ Customer │ │  Order  │ │   Product    │ │
│  │  Remote  │ │  Remote  │ │ Remote  │ │   Remote     │ │
│  └─────────┘ └──────────┘ └─────────┘ └──────────────┘ │
└─────────────────────────────────────────────────────────┘
         │             │            │             │
    Independent   Independent  Independent  Independent
     deploy        deploy       deploy        deploy
```

## Micro-Frontend Remotes

| Remote | Port | Description | Monolith Origin |
|--------|------|-------------|-----------------|
| `shell` | 4200 | Host application — layout, top-level routing, auth shell | `app.component`, `app.routes`, `login`, `settings`, `home` |
| `identity-mfe` | 4201 | Login, user management, role management | `login`, `controls/users-management`, `controls/roles-management` |
| `customer-mfe` | 4202 | Customer listing and management | `customers` component |
| `order-mfe` | 4203 | Order listing and management | `orders` component |
| `product-mfe` | 4204 | Product catalog management | `products` component |

## Project Structure

```
apps/
├── shell/                        # Host application (Webpack Module Federation)
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts     # Lazy-loads remote modules
│   │   │   └── shared/           # Shared auth state, layout
│   │   ├── bootstrap.ts
│   │   └── main.ts
│   ├── webpack.config.js         # Module Federation host config
│   ├── angular.json
│   └── package.json
├── identity-mfe/                 # Remote: identity/auth features
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/
│   │   │   ├── users/
│   │   │   ├── roles/
│   │   │   └── remote-entry.routes.ts
│   │   └── bootstrap.ts
│   ├── webpack.config.js         # Module Federation remote config
│   └── package.json
├── customer-mfe/                 # Remote: customer management
│   ├── src/app/
│   │   ├── customer-list/
│   │   ├── customer-detail/
│   │   └── remote-entry.routes.ts
│   ├── webpack.config.js
│   └── package.json
├── order-mfe/                    # Remote: order management
│   ├── src/app/
│   │   ├── order-list/
│   │   ├── order-detail/
│   │   └── remote-entry.routes.ts
│   ├── webpack.config.js
│   └── package.json
└── product-mfe/                  # Remote: product catalog
    ├── src/app/
    │   ├── product-list/
    │   ├── product-detail/
    │   └── remote-entry.routes.ts
    ├── webpack.config.js
    └── package.json
libs/
└── shared/                       # Shared library (auth tokens, models, utilities)
    ├── src/
    │   ├── auth/
    │   ├── models/
    │   └── index.ts
    └── package.json
```

## Technology Stack

- **Angular 21** — each micro-frontend is a standalone Angular application
- **Webpack 5 Module Federation** — dynamic module loading at runtime
- **@angular-architects/module-federation** — Angular-specific MFE tooling
- **NgRx** — shared state management across remotes (optional)
- **Docker** — containerized per MFE
- **Kubernetes** — orchestration (see `app_dotnet_angular_containerized_decomposition_iac`)

## Getting Started

```bash
# Install dependencies (root + all five apps)
npm run install:all

# Run shell + all remotes locally
npm run start:all

# Run individual MFE
cd apps/shell && npm start
cd apps/identity-mfe && npm start
```

## Testing

End-to-end tests use [Playwright](https://playwright.dev) and live under
[`e2e/`](e2e/). They cover the shell layout, remote list/detail navigation,
`remoteEntry.js` availability, and fallback routing. See
[`e2e/README.md`](e2e/README.md) for setup and usage.

```bash
npm run install:all
npx playwright install chromium
npm run test:e2e
```

## Related Repositories

| Repo | Purpose |
|------|---------|
| [`app_dotnet_angular_containerized_decomposition_monolith`](https://github.com/Cognition-Partner-Workshops/app_dotnet_angular_containerized_decomposition_monolith) | Before-state monolith |
| [`app_dotnet_angular_containerized_decomposition_microservices`](https://github.com/Cognition-Partner-Workshops/app_dotnet_angular_containerized_decomposition_microservices) | .NET microservices target |
| [`app_dotnet_angular_containerized_decomposition_iac`](https://github.com/Cognition-Partner-Workshops/app_dotnet_angular_containerized_decomposition_iac) | App-specific Helm charts |
| [`platform-engineering-shared-services`](https://github.com/Cognition-Partner-Workshops/platform-engineering-shared-services) | Shared EKS cluster and platform infra |
