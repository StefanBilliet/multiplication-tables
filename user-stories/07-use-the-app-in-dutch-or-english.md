## User Story 7 - Use the app in Dutch or English

As a child using the app,  
I want to use the app in Dutch or English,  
so that I can understand all text in the language that is most comfortable for me.

### Acceptance Criteria

- Given the app starts and the detected browser or device language has base language `nl`,
  when the app loads,
  then all visible text is shown in Dutch.

- Given the app starts and the detected browser or device language has base language `en`,
  when the app loads,
  then all visible text is shown in English.

- Given the app starts and the detected browser or device language is not supported,
  when the app loads,
  then all visible text is shown in Dutch.

- Given the app is open,
  when the user switches language using the in-app control,
  then all visible text updates immediately without a page reload.

- Given the user is in the middle of a practice run,
  when the user switches language,
  then the current session continues and all visible text updates to the selected language.

- Given any screen, feedback message, validation message, or practice-related text is shown,
  when the app is displayed in Dutch or English,
  then that text is localized.

### Status: Complete

All acceptance criteria are implemented and verified:

- Browser-language detection with Dutch fallback is configured in `src/shared/i18n/index.ts`
- Dutch and English locale resources are registered
- An in-app language switcher is available through `src/features/table-selection/components/languageSwitcher.tsx`
- The language switcher is also available during practice sessions via the practice-screen header
- All runtime user-visible text is localized
- `npm run isEverythingOk` passes (11 test files, 90 tests)

### Out of Scope

- Remembering the manually selected language across refreshes or future visits.
- Supporting languages other than Dutch and English.
