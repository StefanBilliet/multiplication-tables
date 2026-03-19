# US-07 Status Audit

## User Story

Use the app in Dutch or English.

## Acceptance Criteria Status

- [ ] AC1: When the app starts with browser/device base language `nl`, all visible text is shown in Dutch.
  - Not met.
  - Evidence: `src/shared/i18n/index.ts` only loads English and hardcodes `lng: "en"`.

- [~] AC2: When the app starts with browser/device base language `en`, all visible text is shown in English.
  - Partially met.
  - English is shown, but only because startup language is always English, not because browser language is detected.
  - Evidence: `src/shared/i18n/index.ts`

- [ ] AC3: When the app starts with an unsupported browser/device language, all visible text is shown in Dutch.
  - Not met.
  - Fallback is English, not Dutch.
  - Evidence: `src/shared/i18n/index.ts`

- [ ] AC4: When the user switches language using the in-app control, all visible text updates immediately without reload.
  - Not met.
  - No in-app language switcher exists.
  - No `i18n.changeLanguage(...)` usage found in `src`.

- [ ] AC5: When the user switches language mid-practice-run, the current session continues and visible text updates.
  - Not met.
  - No language switching exists yet.
  - Session state is local in `src/features/practice-session/components/practiceScreen.tsx`, so this should be feasible once switching is added.

- [~] AC6: Any screen, feedback message, validation message, or practice-related text is localized in Dutch or English.
  - Partially met.
  - Some components now use `t(...)`, but several user-visible strings remain hardcoded in English.
  - Only `en` locale exists today.

## What Was Already Started

- Added i18n setup: `src/shared/i18n/index.ts`
- Added English locale file: `src/locales/en.json`
- Imported i18n in app startup: `src/main.tsx`
- Imported i18n in test setup: `src/shared/testing/setup.ts`
- Localized parts of:
  - `src/features/table-selection/components/tableSelection.tsx`
  - `src/features/table-selection/components/multiplicationTableCard.tsx`
  - `src/features/practice-session/components/backToTablesButton.tsx`
  - `src/features/practice-session/components/currentQuestionPrompt.tsx`
  - `src/features/practice-session/components/header.tsx`
  - `src/features/practice-session/components/rewardEarnedSummary.tsx`
  - `src/features/practice-session/components/sessionSummary.tsx`

## Remaining Hardcoded User-Visible Text

- `src/features/table-selection/components/tableSelection.tsx`
  - `${id} times table`

- `src/features/practice-session/components/continueButton.tsx`
  - `Continue`

- `src/features/practice-session/components/checkAnswerButton.tsx`
  - `Check answer`

- `src/features/practice-session/components/answerPad.tsx`
  - `Answer`

- `src/features/practice-session/components/answerField.tsx`
  - `Answer`
  - `Choose a number`

- `src/features/practice-session/components/practiceScreen.tsx`
  - `You've completed this practice session.`

## Bugs / Suspicious Partial Implementation

- `src/features/practice-session/components/header.tsx`
  - Likely logic bug:
    - `description` gets a default non-empty string
    - rendering checks `description ? completedDescription : defaultDescription`
    - result: likely always shows completed description

- `src/shared/i18n/index.ts`
  - English only
  - No Dutch resource
  - No browser-language detection
  - Fallback language is wrong for US-07

- `src/features/table-selection/components/tableSelection.tsx`
  - Table labels are assembled outside translation (`${id} times table`), so adding Dutch later will still leave this string in English unless refactored

- `index.html`
  - Document language is still fixed to English (`lang="en"`), which may also need follow-up once runtime language switching is in place

## Current Conclusion

US-07 is not complete.

Current repo state is best described as:
- English-only i18n scaffolding: done
- Dutch support: missing
- Browser language detection: missing
- In-app language switching: missing
- Full UI localization: incomplete

## Recommended Resume Plan

1. Add Dutch locale file and register both `nl` and `en`.
2. Implement browser language detection with Dutch fallback.
3. Add an in-app language switcher wired to `i18n.changeLanguage(...)`.
4. Localize all remaining hardcoded strings.
5. Fix the `Header` description logic bug.
6. Add or repair tests for:
   - startup in Dutch
   - startup in English
   - unsupported language fallback to Dutch
   - switching language without reload
   - switching language during an active practice session
   - localized visible text across table selection and practice flow
