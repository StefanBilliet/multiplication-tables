# US-18: Improve test performance without reducing coverage
Status: closed

## Background

The Vitest suite is currently spending most of its time in jsdom, module loading, and shared test setup rather than in application code. We want to reduce test runtime where practical, but not by weakening coverage or deleting meaningful assertions.

## User Story

**As a** developer  
**I want to** reduce test overhead in the shared test infrastructure  
**So that** the suite runs faster while keeping coverage and confidence stable

## Baseline Metrics

- Full suite test run time: `5.32s`
- Coverage run time: `6.39s`
- Coverage baseline:
  - Statements: `95.34%`
  - Branches: `90.52%`
  - Functions: `95.89%`
  - Lines: `96.55%`

## Acceptance Criteria

### Given the shared test infrastructure is changed
- The full suite still passes
- Coverage does not drop below the baseline above
- The measured runtime is documented again after the change

### Given the global test setup is reviewed
- Unnecessary work is removed from `src/shared/testing/setup.ts`
- Storage or store resets are only performed in tests that need them

### Given a test does not need the full app wrapper
- It can use a lighter helper than `renderComponent`
- Integration-style tests may still use the full helper when needed

### Given the test suite is optimized
- Semantic Testing Library queries remain the default
- No broad selector rewrite is done unless a specific hotspot is proven

## Planned Changes

- Narrow `src/shared/testing/setup.ts` to only universal setup work
- Keep persistence cleanup local to storage-focused tests
- Consider splitting `src/shared/testing/renderComponent.tsx` into full and lighter helpers
- Keep `renderWithRouter` thin unless router-specific profiling shows a problem

## Non-Goals

- Redesigning application components for test speed alone
- Replacing semantic queries with lower-quality selectors
- Reducing coverage to make tests faster
