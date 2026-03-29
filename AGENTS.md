# AGENTS.md

## Purpose

This project uses strict, conversation-driven TDD for behavior changes. The goal is not just passing tests, but small, explicit steps with readable tests and clear boundaries between UI concerns, routing, and behavior.

## Folder Layout

- Keep top-level `src/` folders feature-first whenever possible.
- Use `src/app/` for app-shell composition, providers, and app-wide UI helpers.
- Use `src/platform/` for non-feature support code such as theme, styles, locales, and PWA wiring.
- Keep `src/shared/` small and generic: test plumbing, bootstrap helpers, and other code with no clear feature owner.
- If a folder starts mixing responsibilities, split the feature-owned code out early instead of letting `shared` become a catch-all.

## Workflow

- Use strict TDD for any runtime behavior change.
- Follow `RED -> GREEN -> REFACTOR`.
- Each step must be a single phase only.
- After every step:
  - summarize what changed
  - show the command that was run
  - state the expected result
  - stop and ask whether to proceed

## Test Style

- Use `test(...)`, not `it(...)`.
- Use uppercase GWT naming:
  - `GIVEN ... WHEN ... THEN ...`
- Keep each test body to at most 3 logical paragraphs:
  1. setup
  2. act
  3. assert
- The act should reflect what the test is actually exercising.
- If a system-under-test variable is introduced, name it `sut`.

## Test Quality

- Do not use proxy assertions when the real behavior can be asserted directly.
- When a requirement describes a complete visible set, assert the complete set.
- Prefer clear, readable assertions over clever or compressed test code.
- Do not use `.forEach`.

## React and UI Design

- Prefer `React.FC` for components where applicable.
- Keep components focused on their own responsibility.
- Prefer deriving UI state from domain state instead of passing many presentation props.
- Keep presentational components as dumb as practical.
- Use [AGENTS-styling](AGENTS-styling.md) when styling components.

## Routing

- `BrowserRouter` belongs in `src/main.tsx`.
- `src/app/app.tsx` owns route definitions.
- Use `MemoryRouter` in tests and Storybook when router context is needed.
- In routing tests, keep the router real.
- When the purpose of a test is only to verify navigation, mock or stub destination route components.

## Test Helpers

- Use `src/shared/testing/renderComponent.tsx` for general component rendering.
- Use `src/shared/testing/renderWithRouter.tsx` for routed rendering.

## Verification

- Before finishing meaningful work, run:

```bash
npm run isEverythingOk
```

## Commits

- When a commit clearly belongs to a specific user story, prefix the commit message with that user story identifier.
- Example:
  - `US-001 feat: start table practice sessions from the selection screen`
