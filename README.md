# Multiplication Tables Practice

An interactive learning application for mastering multiplication tables with gamification elements.

**Live Demo**: https://happy-pebble-01eeebd03.2.azurestaticapps.net

## Features

- **Interactive Practice Sessions**: Answer questions using a number pad with instant feedback
- **Test Mode**: Challenge yourself with timed sessions to build speed and accuracy
- **Practice History**: Review your previous sessions and track your progress over time
- **Settings**: Customize your learning experience, including question ordering and hesitation rules
- **Multi-Language Support**: Available in English and Dutch
- **Offline-Capable**: Progressive Web App (PWA) with service worker

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 19 + TypeScript |
| Build Tool | Vite 8 |
| UI Components | Mantine 8 |
| Routing | React Router v7 |
| i18n | i18next |
| Testing | Vitest + React Testing Library |
| Component Docs | Storybook |
| Code Quality | Biome (linting & formatting) |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Run tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Start Storybook
pnpm run storybook

# Quality check (lint + format + build + test + storybook)
pnpm run isEverythingOk
```

## Project Structure

```
src/
├── app/
│   ├── app.tsx              # Route definitions
│   └── providers/          # App-level providers
├── practice-history/       # History recording and UI components
├── practice-session/       # Core gameplay implementation
├── settings/               # User configuration logic and UI
├── shared/
│   ├── i18n/               # Internationalization
│   ├── testing/            # Test utilities and factories
│   └── ...                 # Other shared utilities
└── platform/               # Theme, styles, locales, and PWA wiring
```

## Development Workflow

This project follows a strict Test-Driven Development (TDD) approach:

1. **RED**: Write a failing test
2. **GREEN**: Write the minimum code to make it pass
3. **REFACTOR**: Improve code while keeping tests green

Run the full quality gate before committing:

```bash
pnpm run isEverythingOk
```

This command runs:
- Biome linting (`biome check`)
- Code formatting (`biome format`)
- TypeScript build
- Unit tests
- Storybook build
