## User Story 9 - Remember the selected language

As a returning user,  
I want the app to remember the language I selected,  
so that I do not need to switch languages again every time I reopen the app.

### Acceptance Criteria

- Given the user manually selects Dutch or English,
  when they refresh or reopen the app later on the same device,
  then the app opens in that previously selected language.

- Given a saved language preference exists,
  when the app starts,
  then the saved language is used instead of auto-detected language.

- Given no saved language preference exists,
  when the app starts,
  then the app uses browser or device language detection with Dutch as fallback.

- Given the user changes language during a practice run,
  when the language updates,
  then the current session continues and the new language preference is saved for future visits.

- Given the user changes the language multiple times,
  when the app is reopened,
  then the most recently selected language is used.
