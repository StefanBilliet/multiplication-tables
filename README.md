# Multiplication Tables Practice

An interactive learning application for mastering multiplication tables with gamification elements.

**Live Demo**: https://happy-pebble-01eeebd03.2.azurestaticapps.net

## Features

- **10 Multiplication Tables**: Practice with tables 1-10
- **Progressive Unlock System**: Earn rewards by completing practice sessions to unlock higher tables
- **Interactive Practice Sessions**: Answer questions using a number pad with instant feedback
- **Rewards System**: Track your lifetime rewards across sessions
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
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Start Storybook
npm run storybook

# Quality check (lint + format + build + test + storybook)
npm run isEverythingOk
```

## Project Structure

```
src/
├── app/
│   ├── app.tsx              # Route definitions
│   └── providers/          # App-level providers
├── features/
│   ├── table-selection/    # Table selection screen
│   │   ├── components/
│   │   │   ├── tableSelection.tsx
│   │   │   ├── multiplicationTableCard.tsx
│   │   │   └── languageSwitcher.tsx
│   │   └── utils/
│   └── practice-session/   # Practice session flow
│       ├── components/
│       │   ├── practiceScreen.tsx
│       │   ├── answerPad.tsx
│       │   ├── answerField.tsx
│       │   └── summaryMode.tsx
│       └── models/
├── shared/
│   ├── i18n/               # Internationalization
│   │   ├── index.ts
│   │   ├── en.json
│   │   └── nl.json
│   ├── rewards/           # Reward tracking system
│   └── testing/           # Test utilities and factories
└── locales/               # Translation files
```

## Development Workflow

This project follows a strict Test-Driven Development (TDD) approach:

1. **RED**: Write a failing test
2. **GREEN**: Write the minimum code to make it pass
3. **REFACTOR**: Improve code while keeping tests green

Run the full quality gate before committing:

```bash
npm run isEverythingOk
```

This command runs:
- Biome linting (`biome check`)
- Code formatting (`biome format`)
- TypeScript build
- Unit tests
- Storybook build
