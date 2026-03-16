## User Story 2 - Answer multiplication questions and receive immediate feedback

As a child,  
I want to answer multiplication questions and immediately see whether I am correct,  
so that I can practice the selected table step by step.

### Acceptance Criteria

- Given I have started a practice session,
  when a question is shown,
  then I see exactly one multiplication question at a time.

- Given I am practicing a specific table,
  when questions are shown,
  then every question belongs to that selected table.

- Given a question is shown and no answer is selected,
  when I view the answer controls,
  then the `Check answer` action is disabled.

- Given a question is shown,
  when I select number buttons before submitting,
  then the currently visible answer reflects the latest selection.

- Given I have selected an answer,
  when I press `Check answer`,
  then the app evaluates the currently visible answer as correct or incorrect for the current question.

- Given the submitted answer is incorrect,
  when feedback is shown,
  then incorrect feedback is displayed and the same question remains active.

- Given the submitted answer is incorrect,
  when feedback is shown,
  then the selected answer resets so I can try again.

- Given the submitted answer is correct,
  when feedback is shown,
  then success feedback is displayed for the current question.

- Given correct feedback is visible,
  when I choose to continue,
  then the app shows the next question for the selected table.

### Notes

- Answers are selected using on-screen number buttons; free-text input is out of scope.
- There is no separate clear-answer action.
- The app does not auto-advance after a correct answer.
- Rich or highly engaging feedback can be added in a later pass; simple feedback is enough for now.
